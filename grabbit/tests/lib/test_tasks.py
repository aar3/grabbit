import pytest
from lib.tasks import SlickDealsScraper, SCRAPERS
from lib.const import SLICKDEALS_SCRAPER_START_URL
from deal.models import Deal


class TestSlickDealsScraper:
    @pytest.mark.django_db
    def test_scraping_url_returns_a_valid_single_deal(self):
        s = SlickDealsScraper(name=SCRAPERS.SLICK_DEALS, domain="https://slickdeals.net")
        s.run()

        instances = Deal.objects.all().order_by("-created_at")
        assert len(instances) == 1
        assert instances[0] is not None
        assert s.processed == 1
