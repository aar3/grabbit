from django.conf import settings
from django.apps import apps
from celery import Celery
from lib.tasks import NikeScraper, FentyBeautyScraper

task_manager = Celery("lib.celery", backend=settings.CELERY_RESULT_BACKEND, broker=settings.CELERY_BROKER)


# @task_manager.task
def nike_scraper_task(start=None):
    scraper = NikeScraper(start=start)
    scraper.set_cookies()
    scraper.hydrate_queue_from_deal_page()
    scraper.run()


# @task_manager.task
def fenty_beauty_scraper_task(start=None):
    scraper = FentyBeautyScraper(start=start)
    scraper.hydrate_queue_from_deal_page()
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
