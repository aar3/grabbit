import abc
import string
import json
import datetime as dt
import time
import collections
import threading
from urllib import parse
import re
import django
import requests
from bs4 import BeautifulSoup
from grabbit import logger
from lib.const import EMPTY_IMAGE_URL

django.setup()

from deal.models import Deal
from scraper.models import ScraperStats


START_URLS = {
    "slickdeals": "https://slickdeals.net/f/14750294-15-count-1-4-oz-fiber-one-chewy-bars-mega-pack-oats-and-chocolate-4-57-0-30-each-w-s-s-free-shipping-w-prime-or-on-orders-over-25?src=frontpage",
    "target": "https://www.target.com/p/powerbeats-pro-true-wireless-in-ear-earphones/-/A-78362035?preselect=54610898#lnk=sametab",
    "amazon": "https://www.amazon.com/TOZO-Wireless-Upgraded-Sleep-Friendly-FastCharging/dp/B07FM8R7J1/ref=sr_1_3?dchild=1&keywords=wireless+charger&qid=1610070173&sr=8-3",
    "nike": "https://www.nike.com/t/air-max-270-react-womens-shoe-trW1vK/CZ6685-100",
    "fenty-beauty": "https://www.fentybeauty.com/two-lil-stunnas-mini-longwear-fluid-lip-color-duo/47670.html",
}

INTEGER_ONLY_REGEX = re.compile(r"[^\d.]+")


def cookie_dict_to_str(d):
    items = []
    for key, value in d.items():
        items.append(key + "=" + value)
    return "; ".join(items)


class LockedQueue(collections.deque):
    def __init__(self, *args, **kwargs):
        super(LockedQueue, self).__init__(*args, **kwargs)
        self.lock = threading.Lock()


class ThreadedScraper(abc.ABC):
    def __init__(
        self, name, domain, max_handles=10, max_successful_tasks=10, max_total_tasks=20, timeout=3, sleep=1, start=None
    ):
        self.domain = domain
        self.queue = LockedQueue()
        self.max_handles = max_handles
        self.max_successful_tasks = max_successful_tasks
        self.max_total_tasks = max_total_tasks
        self.name = name
        self.start = self._set_start_url(start)
        self.session = requests.Session()
        self.soup = None
        self._handles = []
        self.headers = {}
        self.info = {
            "started_at": dt.datetime.now().strftime("%Y-%m-%d %H:%M:%s"),
            "successful_tasks": 0,
            "total_tasks": 0,
            "queue": 0,
            "successes_with_updates": 0,
            "too_recent_duplicates": 0,
            "max_successful_tasks": self.max_successful_tasks,
            "max_total_tasks": self.max_total_tasks,
            "duplicate_tasks": 0,
            "bad_tasks": 0,
            "failed_tasks": 0,
            "finished_at": None,
        }
        self.lock = threading.Lock()
        self.timeout = timeout
        self.sleep = sleep

    def _set_start_url(self, start):
        if start:
            return start
        deals = Deal.objects.filter(scraper=self.name).order_by("-created_at")
        if not deals:
            return START_URLS[self.name]
        return deals[0].url

    def run(self):
        self.queue.append(self.start)
        start = time.time()
        while self.queue and (
            (self.info["successful_tasks"] < self.max_successful_tasks)
            and (self.info["total_tasks"] < self.max_total_tasks)
        ):
            with self.lock:
                self.info["queue"] = len(self.queue)

            if len(self._handles) == self.max_handles:
                self._prune_handles()
            else:
                url = self.queue.popleft()
                handle = threading.Thread(target=self.download_and_process_url_contents, args=(url,), daemon=True)
                handle.start()
                handle.join()

                self._handles.append(handle)

        with self.lock:
            self.info["finished_at"] = dt.datetime.now().strftime("%Y-%m-%d %H:%M:%s")
            self.info["runtime"] = time.time() - start

        _ = ScraperStats.objects.create(name=self.domain, metadata=self.info)
        time.sleep(self.sleep)

    def download_and_process_url_contents(self, url):
        response = self.session.get(url, headers=self.headers)

        if not 200 <= response.status_code < 300:
            return self._handle_failed_scrape(url, response)

        self.soup = BeautifulSoup(response.content, "html5lib")
        product_urls = self._related_urls(url)
        logger.info("Found %s product links from the associated url", len(product_urls))

        with self.queue.lock:
            for x in product_urls:
                self.queue.append(x)

        self.build_and_save_deal(url)
        with self.lock:
            self.info["total_tasks"] += 1
        logger.info("INFO - %s", json.dumps(self.info))

    def _prune_handles(self):
        for i, handle in enumerate(self._handles):
            if not handle.is_alive():
                try:
                    del self._handles[i]
                except IndexError as err:
                    logger.error("Could not delete dead thread: %s", str(err))

    def build_and_save_deal(self, url):
        description = self._product_description()
        current_value, original_value = self._price_metadata(url)
        img_url, img_urls = self._product_imgs(url)
        title = self._product_title()

        conditions = [
            (not current_value, "price"),
            (not original_value, "price"),
            (not img_url, "img-url"),
            (not img_urls, "img-urls"),
            (not description, "description"),
        ]

        for condition, reason in conditions:
            if condition:
                return self._handle_bad_scrape(url, reason=reason)

        # # NOTE: keep this here for debugging
        # data = {
        #     "description": description,
        #     "current_value": current_value,
        #     "merchant_name": self.name,
        #     "original_value": original_value,
        #     "img_url": img_url,
        #     "scraper": self.name,
        #     "img_urls": img_urls,
        #     "title": title,
        # }
        # print(">>> data", data)

        instance = Deal(
            title=title,
            current_value=current_value,
            original_value=original_value,
            description=description,
            merchant_name=self.merchant_name,
            img_url=img_url,
            scraper=self.name,
            all_img_urls=img_urls,
            url=url,
        )

        instance.set_uid()

        with self.lock:
            try:
                other = Deal.objects.get(uid=instance.uid)
                if other.last_scraped_today():
                    logger.info(
                        "Processed a scraped deal that already exists (however it was scraped too recently to update): %s",
                        url,
                    )
                    self.info["duplicate_tasks"] += 1
                    self.info["too_recent_duplicates"] += 1
                    return

                instance.save(other=other)
                logger.info("Processed a scraped deal that already exists (updating price history): %s", url)
                self.info["successes_with_updates"] += 1
                self.info["successful_tasks"] += 1
            except Deal.DoesNotExist:
                instance.save()
                logger.info("Processed a new scraped deal: %s", instance.uid)
                self.info["successful_tasks"] += 1
                return

    @abc.abstractmethod
    def hydrate_queue_from_deal_page(self):
        raise NotImplementedError

    @abc.abstractmethod
    def _related_urls(self, url):
        raise NotImplementedError

    @abc.abstractmethod
    def _product_title(self):
        raise NotImplementedError

    @abc.abstractmethod
    def _price_metadata(self, url):
        raise NotImplementedError

    @abc.abstractmethod
    def _product_id_from_url(self, url):
        raise NotImplementedError

    @abc.abstractmethod
    def _product_imgs(self, url):
        raise NotImplementedError

    @abc.abstractmethod
    def _product_description(self):
        raise NotImplementedError

    @abc.abstractmethod
    def _is_product_url(self, url):
        raise NotImplementedError

    def _handle_bad_scrape(self, url, reason):
        logger.warning("Successfully scraped a product link that was NOT a deal (due to: %s): %s", reason, url)
        with self.lock:
            self.info["bad_tasks"] += 1

    def _handle_failed_scrape(self, url, response):
        with self.lock:
            self.info["failed_tasks"] += 1
            self.info["bad_tasks"] += 1
        logger.info("INFO - %s", json.dumps(self.info))
        logger.info("Scraping %s return invalid response code: %s", url, response.status_code)


class TargetScraper(ThreadedScraper):
    # NOTE: https://stackoverflow.com/a/59011424/4701228
    def __init__(self, name="target", domain="https://target.com", **kwargs):
        super(TargetScraper, self).__init__(name, domain, **kwargs)
        self.name = name
        self.merchant_name = "Target"
        self.domain = domain
        self.visitor_id = None
        self.store_id = None

    def hydrate_queue_from_deal_page(self):
        # https://www.target.com/c/electronics-deals/-/N-556x9Zwtqd4Ztcob7ZsvzkjZ5xp41?type=products
        pass

    def _related_urls(self, url):
        pid = self._extract_product_id_from_url(url)
        params = {
            "key": "ff457966e64d5e877fdbad070f276d18ecec4a01",
            "page": f"/p/A-{pid}",
            "channel": "WEB",
            "tcins": pid,
            "pricing_store_id": self.store_id,
            "placement_id": "adaptpdph1",
            "visitor_id": self.visitor_id,
        }
        response = requests.get(
            "https://redsky.target.com/redsky_aggregations/v1/web/pdp_recommendations_placement_v1", params=params
        )
        rjson = response.json()
        results = []

        recommended = rjson["data"].get("recommended_products", {"products": []})
        for product in recommended["products"]:
            item = product.get("item")
            if item:
                enrichment = item.get("enrichment")
                if enrichment:
                    results.append(enrichment.get("buy_url"))

        return results

    def set_redsky_api_cookies(self):
        self.session.get("https://target.com")
        self.visitor_id = self.session.cookies.get("visitorId")
        locations = self.session.cookies.get("GuestLocation")
        location = None
        if locations:
            location = locations.split("|")[0]

        response = requests.get(
            "https://redsky.target.com/v3/stores/nearby/{}?key={}&limit=1&within=100&unit=mile".format(
                location, self.visitor_id
            )
        )
        rjson = response.json()
        if rjson:
            part = rjson[0]
            if part:
                locations = part.get("locations")
                if locations:
                    location = locations[0]
                    if location:
                        self.store_id = location.get("location_id")
                        return logger.info("set_redsky_api_cookies was successful")
        logger.info("set_redsky_api_cookies didn't properly set the store_id and visitor_id")

    # def _merchant_name(self):
    #     return "Target"

    def _product_title(self):
        title = self.soup.find("title", {"data-react-helmet": "true"})
        text = title.get_text()
        x = text.find(":")
        return text[:x]

    def _product_description(self):
        description_lis = self.soup.select("li[class*=styles__]")
        if not description_lis:
            return None

        sentences = []
        for item in description_lis:
            span = item.find("span")
            if not span:
                continue
            sentences.append(span.get_text() + ".")

        return " ".join(sentences)

    def _price_metadata(self, url):
        current = None
        original = None

        pid = self._product_id_from_url(url)
        params = {"pricing_store_id": self.store_id, "key": self.visitor_id}
        response = requests.get(f"http://redsky.target.com/web/pdp_location/v1/tcin/{pid}", params=params)
        price_metadata = response.json()["price"]

        # NOTE: If these keys aren't present then we assume that it's not a discount
        if "current_retail_min" not in price_metadata and "reg_retail_max" not in price_metadata:
            return current, original

        current = price_metadata["current_retail_min"]
        original = price_metadata["reg_retail_max"]

        if current == original:
            # NOTE: Anything where the max value is equal to the current value is not a deal/discount
            return None, None

        return current, original

    def _product_id_from_url(self, url):
        # FIXME: this needs to be done using just string search
        parts = url.split("/")
        id_part = None
        for i, part in enumerate(parts):
            if part.startswith("A-"):
                id_part = part
                break

        pid = ""
        # NOTE: product IDs look like 'A-54184549'
        for i in range(2, len(id_part)):
            ch = id_part[i]
            if ch.isdigit():
                pid += ch
            else:
                break
        return int(pid)

    def _product_imgs(self, url):
        pictures = self.soup.find_all("picture", {"style": "width:100%"})
        if not pictures:
            return None

        imgs = [picture.find("img", {"alt": ""}) for picture in pictures]
        if not imgs:
            return None

        imgs = [img.get("src") for img in imgs]
        return imgs[0], imgs

    def _is_product_url(self, url):
        # FIXME: This needs to use just string search
        parts = url.split("/")
        for part in parts:
            if part.startswith("A-"):
                return True
        return False


class NikeScraper(ThreadedScraper):
    def __init__(self, name="nike", domain="https://nike.com", **kwargs):
        super(NikeScraper, self).__init__(name, domain, **kwargs)
        self.merchant_name = "Nike"
        self.headers = {
            "referer": "https://www.nike.com/",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:84.0) Gecko/20100101 Firefox/84.0",
        }

    def hydrate_queue_from_deal_page(self):
        params = {
            "queryid": "products",
            "anonymousId": "065E1482E9463E9F731299937D8EA206",
            "country": "us",
            "endpoint": "/product_feed/rollup_threads/v2?filter=marketplace(US)&filter=language(en)&filter=employeePrice(true)&filter=attributeIds(5b21a62a-0503-400c-8336-3ccfbff2a684)&anchor=168&consumerChannelId=d9a5bc42-4b9c-4976-858a-f159cf99c647&count=24",
            "language": "en",
            "localizedRangeStr": "{lowestPrice} — {highestPrice}",
        }

        url = "https://api.nike.com/cic/browse/v1"
        response = requests.get(url, params=params, headers=self.headers)
        rjson = response.json()
        for product in rjson["data"]["products"]["products"]:
            for item in product["colorways"]:
                # FIXME: This needs to be done using just string/vec replace
                url_parts = item["pdpUrl"].split("/")
                url_parts[0] = self.domain + "/en"
                url = "/".join(url_parts)
                self.queue.append(url)

    def set_cookies(self):
        self.session.get(self.domain)
        cookie_str = cookie_dict_to_str(self.session.cookies.get_dict())
        self.headers["cookie"] = cookie_str

    def _product_title(self):
        title = self.soup.find("h1", {"id": "pdp_product_title", "data-test": "product-title"})
        if not title:
            return None
        return title.get_text()

    def _product_description(self):
        description = self.soup.find("div", {"class": "description-preview"})
        if not description:
            return None
        return description.get_text()

    def _price_metadata(self, url):
        empty = (None, None)
        original = self.soup.find("div", {"class": "product-price", "data-test": "product-price"})
        if not original:
            return empty
        original = INTEGER_ONLY_REGEX.sub("", original.get_text())
        current = self.soup.find("div", {"class": "product-price", "data-test": "product-price-reduced"})
        if not current:
            return empty
        current = INTEGER_ONLY_REGEX.sub("", current.get_text())
        return current, original

    def _product_imgs(self, url):
        # NOTE: Nike url format https://www.nike.com/t/air-max-270-react-womens-shoe-trW1vK/CZ6685-100
        # where `trW1vK` is the product id
        # The below implementation makes a naive assumption about the url

        pid = self._product_id_from_url(url)
        source_tags = self.soup.find_all("source")
        srcsets = [tag.get("srcset") for tag in source_tags]
        imgs = list(set([src for src in srcsets if src and pid in src]))
        if not imgs:
            return None, None
        return imgs[0], imgs

    def _product_id_from_url(self, url):
        # FIXME: this needs to be done using string search
        parts = url.split("/")
        id_part = parts[parts.index("t") + 1]
        return id_part.split("-")[-1]

    def _is_product_url(self, url):
        parts = url.split("/")
        return "t" in parts

    def _related_urls(self, url):
        params = {
            "appid": "NIKE01US",
            "tk": "76418023697193940",
            "sg": "1",
            "bx": "true",
            "sc": "product_rr",
            "language": "en",
            "currencycode": "USD",
            "ur": url,
        }
        response = self.session.get("https://www.res-x.com/ws/r2/Resonance.aspx", params=params, headers=self.headers)
        data = "[" + response.text + "]"
        data = json.loads(data)
        return [item["pdpURL"] for item in data]


class FentyBeautyScraper(ThreadedScraper):
    def __init__(self, name="fenty-beauty", domain="https://fentybeauty.com", **kwargs):
        super(FentyBeautyScraper, self).__init__(name, domain, **kwargs)
        self.merchant_name = "Fenty Beauty"

    def hydrate_queue_from_deal_page(self):
        response = self.session.get("https://www.fentybeauty.com/sale")
        soup = BeautifulSoup(response.content, "html5lib")
        product_titles = soup.find_all("div", {"class": "product-tile"})
        link_items = [tile.find("a", {"itemprop": "url"}) for tile in product_titles]
        hrefs = [item.get("href") for item in link_items]
        return [url for url in hrefs if self._is_product_url(url)]

    def _product_title(self):
        name = self.soup.find("h1", {"itemprop": "name"})
        if not name:
            return None
        return name.get_text().strip("\n")

    def _product_description(self):
        description = self.soup.find("div", {"itemprop": "description"})
        if not description:
            return None
        ptags = description.find_all("p")
        description = " ".join([p.get_text() for p in ptags])

        pdp_steps = self.soup.find("ul", {"class": "pdp-steps"})
        if not pdp_steps:
            return description
        lis = pdp_steps.find_all("li")
        pdp_description = " ".join([li.get_text() for li in lis])

        return description + "\n\n" + pdp_description

    def _price_metadata(self, url):
        empty = (None, None)
        hidden_spans = self.soup.find_all("span", {"class": "visually-hidden"})

        if not hidden_spans:
            return empty

        original_parent = [span for span in hidden_spans if span.get_text().lower() == "original price:"]
        if not original_parent:
            return empty

        original_parent = original_parent[0]

        original_meta = original_parent.find_next_sibling("span")
        if not original_meta:
            return empty

        original = original_meta.find("meta", {"itemprop": "price"})
        if not original:
            return empty

        current_parent = [span for span in hidden_spans if span.get_text().lower() == "sale price:"]
        if not current_parent:
            return empty

        if not current_parent:
            return empty

        current_parent = current_parent[0]

        current_meta = current_parent.find_next_sibling("span")
        if not current_meta:
            return empty

        current = current_meta.find("meta", {"itemprop": "price"})
        if not current:
            return empty

        return current.get("content"), original.get("content")

    def _product_id_from_url(self, url):
        # FIXME: This should use string search
        url_parts = url.split("/")
        id_part = url_parts[4]
        pid = id_part.split(".")[0]
        return pid

    def _product_imgs(self, url):
        imgs = self.soup.find_all("img")
        sources = self.soup.find_all("source")
        img_sets = list(set([img.get("data-srcset") for img in imgs]))
        source_sets = list(set([src.get("srcset") for src in sources]))
        aggregate = img_sets + source_sets

        pid = self._product_id_from_url(url)

        processed = []
        for img_url in aggregate:
            if not img_url or not pid in img_url:
                continue

            url_without_params = img_url.split("?")[0]
            processed.append(url_without_params)

        processed = list(set(processed))
        return processed[0], processed

    def _is_product_url(self, url):
        pid = self._product_id_from_url(url)
        return pid.isdigit()

    def _related_urls(self, url):
        recommendations = self.soup.find("ul", {"id": "carousel-recommendations"})
        lis = recommendations.find_all("li", {"class": ["item", "grid-tile", "custom-tile", "slick-slide"]})
        hrefs = [li.find("a", attrs={"itemprop": "url", "class": ["thumb-link", "product-link"]}) for li in lis]
        urls = [a.get("href") for a in hrefs]
        return [url for url in urls if self._is_product_url(url)]


if __name__ == "__main__":

    # s = FentyBeautyScraper()
    # s.run()
    r = requests.get("https://www.fentybeauty.com/sale")
    s = BeautifulSoup(r.content, "html5lib")
    f1 = s.find_all("div", {"class": "product-tile"})
    f2 = [item.find("a", {"itemprop": "url"}) for item in f1]
    f3 = [item.get("href") for item in f2]

    print(f3)
