import pytest
from lib.tasks import SlickDealsScraper
from deals.models import Deal


class TestSlickDealsScraper:
    @pytest.mark.django_db
    def test_scraping_url_returns_a_valid_single_deal(self):
        url = "https://slickdeals.net/f/14750294-15-count-1-4-oz-fiber-one-chewy-bars-mega-pack-oats-and-chocolate-4-57-0-30-each-w-s-s-free-shipping-w-prime-or-on-orders-over-25?src=frontpage"
        s = SlickDealsScraper(domain="https://slickdeals.net", start=url, max_tasks=1)
        s.scrape()

        instances = Deal.objects.all().order_by("-created_at")
        assert len(instances) == 1
        assert instances[0] is not None
        assert s.processed == 1

    @pytest.mark.django_db
    def test_scraping_url_returns_a_valid_multiple_deals(self):
        url = "https://slickdeals.net/f/14750294-15-count-1-4-oz-fiber-one-chewy-bars-mega-pack-oats-and-chocolate-4-57-0-30-each-w-s-s-free-shipping-w-prime-or-on-orders-over-25?src=frontpage"
        s = SlickDealsScraper(domain="https://slickdeals.net", start=url, max_tasks=5)
        s.scrape()

        instances = Deal.objects.all().order_by("-created_at")
        assert len(instances) == 5
        assert s.processed == 5
