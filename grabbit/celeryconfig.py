# https://docs.celeryproject.org/en/stable/userguide/configuration.html#example-configuration-file
from grabbit.config import config

broker_url = config.CELERY_BROKER_URL
imports = ("grabbit.lib.tasks",)
result_backend = config.CELERY_RESULT_BACKEND
task_ignore_result = False
