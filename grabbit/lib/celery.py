from django.conf import settings
from django.apps import apps
from celery import Celery
from lib.tasks import TargetScraper, Scrapers, NikeScraper

task_manager = Celery("lib.celery", backend=settings.CELERY_RESULT_BACKEND, broker=settings.CELERY_BROKER)


# @task_manager.task
# def slickdeals_scraper_task():
#     scraper = SlickDealsScraper()
#     scraper.run()


@task_manager.task
def target_scraper_task():
    scraper = TargetScraper()
    scraper.set_redsky_api_cookies()
    scraper.run()


# @task_manager.task
# def amazon_scraper_task():
#     scraper = AmazonScraper()
#     scraper.run()

# @task_manager.task
def nike_scraper_task():
    scraper = NikeScraper()
    scraper.set_cookies()
    scraper.run()


@task_manager.task
def hydrate_redis_read_layer():
    for app in settings.DJANGO_APPS:
        models = apps.get_app_config(app).get_models()
        for model in models:
            serializer_name = model.__name__ + "Serializer"
            for instance in model.objects.all():
                pass
                # TODO : finish
