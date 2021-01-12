from django.conf import settings
from celery import Celery
from lib.tasks import SlickDealsScraper, TargetScraper, SCRAPERS

task_manager = Celery("lib.celery", backend=settings.CELERY_RESULT_BACKEND, broker=settings.CELERY_BROKER)


@task_manager.task
def slickdeals_scraper_task():
    scraper = SlickDealsScraper(domain="https://slickdeals.net", name=SCRAPERS.SLICK_DEALS)
    scraper.run()


@task_manager.task
def target_scraper_task():
    scraper = TargetScraper(domain="https://target.com", name=SCRAPERS.TARGET)
    scraper.set_redsky_api_cookies()
    scraper.run()
