# https://docs.celeryproject.org/en/stable/userguide/configuration.html#example-configuration-file
from grabbit.config import config

broker_url = config.CELERY_BROKER
imports = ("grabbit.lib.celery",)
result_backend = config.CELERY_RESULT_BACKEND
task_ignore_result = False
