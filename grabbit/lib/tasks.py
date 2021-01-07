import abc
import string
import json
import collections
import threading
from urllib import parse
import requests
from celery import Celery
from bs4 import BeautifulSoup
from grabbit.config import config
from grabbit import logger
from deals.models import Deal
from lib.const import SLICKDEALS_SCRAPER_START_URL

task_manager = Celery("lib.tasks", backend=config.CELERY_RESULT_BACKEND, broker=config.CELERY_BROKER)


class LockedQueue(collections.deque):
    def __init__(self, *args, **kwargs):
        super(LockedQueue, self).__init__(*args, **kwargs)
        self.lock = threading.Lock()


class ThreadedScraper(abc.ABC):
    def __init__(self, domain, start, max_handles=10, max_tasks=10):
        self.domain = domain
        self.start = start
        self.queue = LockedQueue([start])
        self.max_handles = max_handles
        self.max_tasks = max_tasks
        self.soup = None
        self._handles = []
        self.headers = {}
        self.info = {
            "successful_tasks": 0,
            "total_tasks": 0,
            "queue": 0,
            "max_tasks": self.max_tasks,
            "duplicate_tasks": 0,
            "failed_tasks": 0,
        }
        self.lock = threading.Lock()
        self.timeout = 3

    def run(self):
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

    def download_and_process_link_contents(self, link):
        response = requests.get(link)

        if not 200 <= response.status_code < 300:
            return self._handle_unsuccessful_scrape_attempt(link, response)

        self.soup = BeautifulSoup(response.content, "html5lib")
        associated_links = self.soup.find_all("a", href=True)
        product_links = list(filter(lambda x: self._is_product_link(x.get("href")), associated_links))
        logger.info(
            "Found %s total links and %s product links from the associated url",
            len(associated_links),
            len(product_links),
        )

        with self.queue.lock:
            for link in product_links:
                self.queue.append((self.domain + link.get("href")))

        self.build_and_save_deal((self.domain + link.get("href")))
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
        description = self._extract_product_description()
        value = self._extract_product_value()
        merchant_name = self._extract_merchant_name()
        discount = self._extract_product_discount()
        img_url = self._extract_product_img_url()
        title = self._extract_product_title()

        instance = Deal(
            title=title,
            value=value,
            discount=discount,
            description=description,
            merchant_name=merchant_name,
            img_url=img_url,
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
    def _is_product_link(self, link):
        raise NotImplementedError

    def _handle_unsuccessful_scrape_attempt(self, url, response):
        with self.lock:
            self.info["total_tasks"] += 1
            self.info["failed_tasks"] += 1
        logger.info("INFO - %s", json.dumps(self.info))
        logger.info("Scraping %s return invalid response code: %s", url, response.status_code)


class SlickDealsScraper(ThreadedScraper):
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
            logger.info("Error parsing product url:%s ", str(err))
        return result


@task_manager.task
def execute_scrape_tasks():
    scraper = SlickDealsScraper(domain="https://slickdeals.net", start=SLICKDEALS_SCRAPER_START_URL)
    scraper.run()
