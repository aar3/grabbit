import abc
import string
import json
import time
import collections
import threading
from urllib import parse
import re
import requests
from django.conf import settings
from celery import Celery
from bs4 import BeautifulSoup
from grabbit import logger
from deal.models import Deal
from lib.const import EMPTY_IMAGE_URL
from scraper.models import ScraperStats

task_manager = Celery("lib.tasks", backend=settings.CELERY_RESULT_BACKEND, broker=settings.CELERY_BROKER)

START_URLS = {
    "slickdeals": "https://slickdeals.net/f/14750294-15-count-1-4-oz-fiber-one-chewy-bars-mega-pack-oats-and-chocolate-4-57-0-30-each-w-s-s-free-shipping-w-prime-or-on-orders-over-25?src=frontpage",
    "target": "https://www.target.com/p/powerbeats-pro-true-wireless-in-ear-earphones/-/A-78362035?preselect=54610898#lnk=sametab",
}

WAIT = 1.0


class SCRAPERS:
    SLICK_DEALS = "slickdeals"
    TARGET = "target"
    AMAZON = "amazon"
    NIKE = "nike"


class DEFAULT_VALUES:
    DESCRIPTION = "No description found for this product."
    TITLE = "Unknown product"
    CURRENT = 0
    ORIGINAL = 0
    MERCHANT_NAME = "Unknown merchant"
    IMG_URL = EMPTY_IMAGE_URL
    IMG_URLS = []


class LockedQueue(collections.deque):
    def __init__(self, *args, **kwargs):
        super(LockedQueue, self).__init__(*args, **kwargs)
        self.lock = threading.Lock()


class ThreadedScraper(abc.ABC):
    def __init__(self, domain, name, max_handles=10, max_tasks=10):
        self.domain = domain
        self.queue = LockedQueue()
        self.max_handles = max_handles
        self.max_tasks = max_tasks
        self.name = name
        self.start = self._set_start_url()
        self.session = requests.session()
        self.soup = None
        self._handles = []
        self.headers = {}
        self.info = {
            "successful_tasks": 0,
            "total_tasks": 0,
            "queue": 0,
            "max_tasks": self.max_tasks,
            "duplicate_tasks": 0,
            "unsuccessful_tasks": 0,
            "failed_tasks": 0,
        }
        self.lock = threading.Lock()
        self.timeout = 3

    def _set_start_url(self):
        deals = Deal.objects.filter(scraper=self.name).order_by("-created_at")
        if not deals:
            return getattr(START_URLS, self.name)
        return deals[0].url

    def run(self):
        self.queue.append(self.start)
        successful_tasks = self.info["successful_tasks"]

        while self.queue and successful_tasks < self.max_tasks:
            with self.lock:
                self.info["queue"] = len(self.queue)
                successful_tasks = self.info["successful_tasks"]

            if len(self._handles) == self.max_handles:
                self._prune_handles()
            else:
                link = self.queue.popleft()
                handle = threading.Thread(target=self.download_and_process_link_contents, args=(link,), daemon=True)
                handle.start()
                handle.join()

                self._handles.append(handle)

        _ = ScraperStats.objects.create(name=self.domain, metadata=self.info)
        time.sleep(WAIT)

    def download_and_process_link_contents(self, link):
        response = self.session.get(link)

        if not 200 <= response.status_code < 300:
            return self._handle_unsuccessful_scrape_attempt(link, response)

        self.soup = BeautifulSoup(response.content, "html5lib")
        product_links = self._get_associated_product_links(link)
        logger.info("Found %s product links from the associated url", len(product_links))

        with self.queue.lock:
            for link in product_links:
                self.queue.append(link)

        self.build_and_save_deal(link)
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
        description = self._extract_product_description(url)
        current_value, original_value = self._extract_product_value_and_discount(url)

        if current_value == DEFAULT_VALUES.CURRENT and original_value == DEFAULT_VALUES.ORIGINAL:
            logger.warning("Successfully scraped a product link that was NOT a deal: %s", url)
            with self.lock:
                self.info["unsuccessful_tasks"] += 1
        else:
            merchant_name = self._extract_merchant_name(url)
            img_url = self._extract_product_img_url(url)
            img_urls = self._extract_all_product_img_urls(url)
            title = self._extract_product_title(url)

            # NOTE: keep this here for debugging
            # data = {
            #     "description": description,
            #     "current_value": current_value,
            #     "merchant_name": merchant_name,
            #     "original_value": original_value,
            #     "img_url": img_url,
            #     "img_urls": img_urls,
            #     "title": title,
            # }

            instance = Deal(
                title=title,
                current_value=current_value,
                original_value=original_value,
                description=description,
                merchant_name=merchant_name,
                img_url=img_url,
                all_img_urls=img_urls,
                url=url,
            )

            instance.set_uid()

            exists = Deal.objects.filter(uid=instance.uid)

            with self.lock:
                if not exists:
                    instance.save()
                    logger.info("Processed a new scraped deal: %s", instance.uid)
                    self.info["successful_tasks"] += 1
                    return

                logger.info("Processed a scraped deal that already exists")
                self.info["duplicate_tasks"] += 1

    @abc.abstractmethod
    def _get_associated_product_links(self, url):
        raise NotImplementedError

    @abc.abstractmethod
    def _extract_product_title(self, url):
        raise NotImplementedError

    @abc.abstractmethod
    def _extract_merchant_name(self, url):
        raise NotImplementedError

    @abc.abstractmethod
    def _extract_product_value_and_discount(self, url):
        raise NotImplementedError

    @abc.abstractmethod
    def _extract_product_img_url(self, url):
        raise NotImplementedError

    @abc.abstractmethod
    def _extract_all_product_img_urls(self, url):
        raise NotImplementedError

    @abc.abstractmethod
    def _extract_product_description(self, url):
        raise NotImplementedError

    @abc.abstractmethod
    def _is_product_link(self, link):
        raise NotImplementedError

    def _handle_unsuccessful_scrape_attempt(self, url, response):
        with self.lock:
            self.info["total_tasks"] += 1
            self.info["failed_tasks"] += 1
        logger.info("INFO - %s", json.dumps(self.info))
        logger.info("Scraping %s return invalid response code: %s", url, response.status_code)


class SlickDealsScraper(ThreadedScraper):
    def __init__(self, domain, name, max_handles=10, max_tasks=10):
        super(SlickDealsScraper, self).__init__(domain, name, max_handles, max_tasks)
        self.name = name

    def _get_associated_product_links(self, url):
        associated_links = self.soup.find_all("a", href=True)
        product_links = list(filter(lambda x: self._is_product_link(x.get("href")), associated_links))
        return [self.domain + link for link in product_links]

    def _extract_product_title(self, url):
        no_link_crumb_tags = self.soup.find_all("span", class_="nolinkcrumb")
        if not no_link_crumb_tags:
            return DEFAULT_VALUES.TITLE

        no_link_crumb_tags_content = [x.get_text() for x in no_link_crumb_tags]
        if not no_link_crumb_tags_content:
            return DEFAULT_VALUES.TITLE

        return no_link_crumb_tags_content[0]

    def _extract_product_description(self, url):
        descriptions = self.soup.find_all("meta", {"name": "description"})
        if not descriptions:
            return DEFAULT_VALUES.DESCRIPTION

        descriptions_without_class_attrs = [x.get("content") for x in descriptions]

        if not descriptions_without_class_attrs:
            return DEFAULT_VALUES.DESCRIPTION

        top_description = descriptions_without_class_attrs[0]
        return top_description.split("\n")[0]

    def _extract_merchant_name(self, url):
        data_link_tags = self.soup.find_all("a", {"data-link": "dealDetail:Description Link"})
        if not data_link_tags:
            return DEFAULT_VALUES.DESCRIPTION

        data_link_tag_contents = [x.get_text() for x in data_link_tags]
        if not data_link_tag_contents:
            return DEFAULT_VALUES.DESCRIPTION

        return data_link_tag_contents[0]

    def _extract_product_value_and_discount(self, url):
        current = DEFAULT_VALUES.CURRENT
        original = DEFAULT_VALUES.ORIGINAL

        prices = self.soup.find_all("meta", {"name": "price"})
        if prices:
            price_values = [x.get("content") for x in prices]
            if price_values:
                current = price_values[0]

        old_price_tags = self.soup.find_all("span", class_="oldListPrice")
        if old_price_tags:
            old_price_tags_text = [x.get_text() for x in old_price_tags]
            if old_price_tags_text:
                price_tag = old_price_tags_text[0]
                original = price_tag[1:] if price_tag[0] == "$" else price_tag

        return current, original

    def _extract_product_img_url(self, url):
        main_images = self.soup.find_all("img", {"id": "mainImage"})
        if not main_images:
            return DEFAULT_VALUES.IMG_URL
        main_image_contens = [x.get("src") for x in main_images]
        if not main_image_contens:
            return DEFAULT_VALUES.IMG_URL

        return main_image_contens[0]

    def _extract_all_product_img_urls(self, url):
        return DEFAULT_VALUES.IMG_URLS

    def _is_product_link(self, link):
        path_parts = link.split("/")
        if len(path_parts) < 2 or path_parts[1] != "f":
            return False

        product_number = path_parts[2].split("-")[0]

        try:
            result = path_parts[1] == "f" and product_number.isdigit()
        except Exception as err:
            logger.info("Error parsing product url:%s ", str(err))
        return result


class TargetScraper(ThreadedScraper):
    # NOTE: https://stackoverflow.com/a/59011424/4701228
    def __init__(self, domain, name, max_handles=10, max_tasks=10):
        super(TargetScraper, self).__init__(domain, name, max_handles, max_tasks)
        self.name = name
        self.visitor_id = None
        self.store_id = None

    def _get_associated_product_links(self, url):
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

    def _extract_merchant_name(self, url):
        return "Target"

    def _extract_product_title(self, url):
        title = self.soup.find("title", {"data-react-helmet": "true"})
        return title.get_text().split(":")[0]

    def _extract_product_description(self, url):
        description_lis = self.soup.select("li[class*=styles__]")
        if not description_lis:
            return DEFAULT_VALUES.DESCRIPTION

        sentences = []
        for item in description_lis:
            span = item.find("span")
            if not span:
                continue
            sentences.append(span.get_text() + ".")

        return " ".join(sentences)

    def _extract_product_value_and_discount(self, url):
        current = DEFAULT_VALUES.CURRENT
        original = DEFAULT_VALUES.ORIGINAL

        pid = self._extract_product_id_from_url(url)
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
            return DEFAULT_VALUES.CURRENT, DEFAULT_VALUES.ORIGINAL

        return current, original

    def _extract_product_id_from_url(self, url):
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

    def _extract_product_img_url(self, url):
        picture = self.soup.find("picture", {"style": "width:100%"})
        if not picture:
            return DEFAULT_VALUES.IMG_URL

        img = picture.find("img", {"alt": ""})
        if not img:
            return DEFAULT_VALUES.IMG_URL

        return img.get("src")

    def _extract_all_product_img_urls(self, url):
        pictures = self.soup.find_all("picture", {"style": "width:100%"})
        if not pictures:
            return None

        imgs = [picture.find("img", {"alt": ""}) for picture in pictures]
        if not imgs:
            return None

        return [img.get("src") for img in imgs]

    def _is_product_link(self, link):
        parts = link.split("/")
        for part in parts:
            if part.startswith("A-"):
                return True
        return False


class AmazonScraper(ThreadedScraper):
    def __init__(self, domain, max_handles=10, max_tasks=10):
        super(AmazonScraper, self).__init__(domain, max_handles, max_tasks)
        self.name = SCRAPERS.AMAZON


@task_manager.task
def slickdeals_scraper():
    scraper = SlickDealsScraper(domain="https://slickdeals.net", name=SCRAPERS.SLICK_DEALS)
    scraper.run()


@task_manager.task
def target_scraper():
    scraper = TargetScraper(domain="https://target.com", name=SCRAPERS.TARGET)
    scraper.set_redsky_api_cookies()
    scraper.run()
