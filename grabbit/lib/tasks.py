import collections
from urllib import parse
import requests
from bs4 import BeautifulSoup
from celery import Celery
from grabbit.config import config
from deals.models import Deal

task_manager = Celery("lib.tasks", backend=config.CELERY_RESULT_BACKEND, broker=config.CELERY_BROKER)

class BaseScraper:
    # NOTE: domain mult inclue protocol: https://slickdeals.net
    def __init__(self, domain, start=None):
        self.domain = domain
        self.start = start
        self.queue = collections.deque()
        self.soup = None
        self.headers = {}
        self.timeout = 3

    def scrape(self):
        self.queue.append(self.start or self.domain)
        while self.queue:
            url = self.queue.popleft()
            response = requests.get(url, headers=self.headers, timeout=self.timeout)
            if not 200 < response.status_code < 300:
                self._handle_unsuccessful_scrape_attempt(url)
                continue

            self.soup = BeautifulSoup(response.content, "html5lib")
            associated_links = self.soup.find_all("a", href=True)
            associated_links_on_domain = list(filter(lambda url: url.startsWith(self.domain), associated_links))
            for link in associated_links_on_domain:
                self.queue.append(link)

    def _handle_unsuccessful_scrape_attempt(self, url):
        raise NotImplementedError


class SlickDealsScraper(BaseScraper):
    def __init__(self, domain, start):
        super(SlickDealsScraper, self).__init__(domain, start)

    def _process_soup(self, url):
        description = self._extract_product_description()
        value = self._extract_product_value()
        merchant_name = self._extract_merchant_name()
        discount = self._extract_product_discount()
        title = self._extract_product_title()

        deal = Deal.objects.create(
            title=self._extract_product_title(),
            value=value,
            discount=discount,
            description=description,
            merchant_name=merchant_name,
            img_url=img_url,
            url=url,
        )

    def _extract_product_title(self):
        default_value = "Unknown Product"
        no_link_crumb_tags = self.soup.find_all("span", class_="nolinkcrumb")
        if not no_link_crumb_tags:
            return default_value

        no_link_crumb_tags_content = [x.get_text() for x in no_link_crumb_tags]
        if not no_link_crumb_tags_content:
            return default_value

        return no_link_crumb_tags_content[0]

    def _extract_merchant_name(self):
        default_value = "Unknown Merchant"
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
        main_images = soup.find_all("img", {"id": "mainImage"})
        if not main_images:
            return None
        main_image_contens = [x.get("src") for x in a]
        if not main_image_contens:
            return None

        return main_image_contens[0]

    def _extract_product_description(self):
        default_msg = "No description found for this product."
        descriptions = self.soup.find_all("meta", {"name": "description"})
        if not descriptions:
            return default_msg

        descriptions_without_class_attrs = [x.get("content") for x in descriptions if "class" not in x]
        if descriptions_without_class_attrs:
            return default_msg

        top_description = descriptions_without_class_attrs[0]
        return top_description.split("\n")[0]

