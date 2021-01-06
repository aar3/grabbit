import abc
import string
import json
import collections
from urllib import parse
import requests
from celery import Celery
from bs4 import BeautifulSoup
from grabbit.config import config
from grabbit import log
from lib.const import SLICKDEALS_SCRAPER_START_URL

task_manager = Celery("lib.tasks", backend=config.CELERY_RESULT_BACKEND, broker=config.CELERY_BROKER)


class BaseScraper(abc.ABC):
    # NOTE: domain mult inclue protocol: https://slickdeals.net
    def __init__(self, domain, start, max_tasks):
        self.domain = domain
        self.parsed_domain = parse.urlsplit(self.domain)
        self.start = start
        self.queue = collections.deque()
        self.soup = None
        self.headers = {}
        self.info = {"completed_tasks": 0, "iters": 0, "queue": 0, "max_tasks": max_tasks}
        self.timeout = 3

    def scrape(self):
        self.queue.append(self.start)
        while self.queue and self.info["completed_tasks"] < self.info["max_tasks"]:

            self.info["queue"] = len(self.queue)
            url = self.queue.popleft()
            log.info("Making request to ", url)
            response = requests.get(url, headers=self.headers, timeout=self.timeout)

            if not 200 <= response.status_code < 300:
                self._handle_unsuccessful_scrape_attempt(url, response)
                self.info["iters"] += 1
                log.info("INFO - {}".format(json.dumps(self.info)))
                continue

            self.soup = BeautifulSoup(response.content, "html5lib")
            associated_links = self.soup.find_all("a", href=True)
            product_links = list(filter(lambda x: self._is_product_link(x.get("href")), associated_links))
            log.info(
                "Found {} total links and {} product links from the associated url".format(
                    len(associated_links), len(product_links)
                )
            )

            for link in product_links:
                product_url = self.domain + link.get("href")
                self.queue.append(product_url)

            self.process_soup(url)
            self.info["iters"] += 1
            log.info("INFO - {}".format(json.dumps(self.info)))

    def process_soup(self, url):
        from deals.models import Deal

        description = self._extract_product_description()
        value = self._extract_product_value()
        merchant_name = self._extract_merchant_name()
        discount = self._extract_product_discount()
        img_url = self._extract_product_img_url()
        title = self._extract_product_title()

        result = Deal.objects.create(
            title=title,
            value=value,
            discount=discount,
            description=description,
            merchant_name=merchant_name,
            img_url=img_url,
            url=url,
        )

        if result != -1:
            log.info("Processed a new scraped deal")
            self.info["completed_tasks"] += 1
        else:
            log.info("Processed a scraped deal that already exists")

    @abc.abstractmethod
    def _extract_product_title(self):
        raise NotImplementedError

    @abc.abstractmethod
    def _extract_merchant_name(self):
        raise NotImplementedError

    @abc.abstractmethod
    def _extract_product_value(self):
        raise NotImplementedError

    @abc.abstractmethod
    def _extract_product_discount(self):
        raise NotImplementedError

    @abc.abstractmethod
    def _extract_product_img_url(self):
        raise NotImplementedError

    @abc.abstractmethod
    def _extract_product_description(self):
        raise NotImplementedError

    @abc.abstractmethod
    def _is_product_link(self, url):
        raise NotImplementedError

    def _handle_unsuccessful_scrape_attempt(self, url, response):
        log.info("Scraping {} return invalid response code: {}".format(url, response.status_code))


class SlickDealsScraper(BaseScraper):
    def __init__(self, domain, start, max_tasks):
        super(SlickDealsScraper, self).__init__(domain, start, max_tasks)

    def _extract_product_title(self):
        default_value = "Mystery product"
        no_link_crumb_tags = self.soup.find_all("span", class_="nolinkcrumb")
        if not no_link_crumb_tags:
            return default_value

        no_link_crumb_tags_content = [x.get_text() for x in no_link_crumb_tags]
        if not no_link_crumb_tags_content:
            return default_value

        return no_link_crumb_tags_content[0]

    def _extract_merchant_name(self):
        default_value = "Mystery merchant"
        data_link_tags = self.soup.find_all("a", {"data-link": "dealDetail:Description Link"})
        if not data_link_tags:
            return default_value

        data_link_tag_contents = [x.get_text() for x in data_link_tags]
        if not data_link_tag_contents:
            return default_value

        return data_link_tag_contents[0]

    def _extract_product_value(self):
        default_value = 0
        prices = self.soup.find_all("meta", {"name": "price"})
        if not prices:
            return default_value

        price_values = [x.get("content") for x in prices]
        if not price_values:
            return default_value

        return price_values[0]

    def _extract_product_discount(self):
        default_value = 0
        old_price_tags = self.soup.find_all("span", class_="oldListPrice")
        if not old_price_tags:
            return default_value

        old_price_tags_text = [x.get_text() for x in old_price_tags]
        if not old_price_tags_text:
            return default_value

        return old_price_tags_text[0]

    def _extract_product_img_url(self):
        main_images = self.soup.find_all("img", {"id": "mainImage"})
        if not main_images:
            return None
        main_image_contens = [x.get("src") for x in main_images]
        if not main_image_contens:
            return None

        return main_image_contens[0]

    def _extract_product_description(self):
        default_msg = "No description found for this product."
        descriptions = self.soup.find_all("meta", {"name": "description"})
        if not descriptions:
            return default_msg

        descriptions_without_class_attrs = [x.get("content") for x in descriptions]

        if not descriptions_without_class_attrs:
            return default_msg

        top_description = descriptions_without_class_attrs[0]
        return top_description.split("\n")[0]

    def _is_product_link(self, link):
        path_parts = link.split("/")
        if len(path_parts) < 2 or path_parts[1] != "f":
            return False

        product_number = path_parts[2].split("-")[0]

        try:
            result = path_parts[1] == "f" and product_number.isdigit()
        except Exception as err:
            log.info("Error parsing product url:%s ", str(err))
        return result


@task_manager.task
def execute_scrape_tasks():
    scraper = SlickDealsScraper(domain="https://slickdeals.net", start=SLICKDEALS_SCRAPER_START_URL, max_tasks=5)
    scraper.scrape()
