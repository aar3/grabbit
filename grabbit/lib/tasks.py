from celery import Celery
from grabbit.config import config

task_manager = Celery("lib.tasks", backend=config.CELERY_RESULT_BACKEND, broker=config.CELERY_BROKER)


class BaseScraper:
    pass


class SlickDealsScaper(BaseScraper):
    pass
