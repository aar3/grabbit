import pytest
from lib.tasks import SlickDealsScraper
from deals.models import Deal


class TestSlickDealsScraper:
    @pytest.mark.django_db
    def test_scraping_url_returns_a_valid_deal(self):
        url = "https://slickdeals.net/f/14750294-15-count-1-4-oz-fiber-one-chewy-bars-mega-pack-oats-and-chocolate-4-57-0-30-each-w-s-s-free-shipping-w-prime-or-on-orders-over-25?src=frontpage"
        s = SlickDealsScraper(domain="https://slickdeals.net", start=url)
        s.scrape()

        instance = Deal.objects.all().order_by("-created_at")[0]
        assert instance is not None