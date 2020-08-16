import os

from ._base import *

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "grabbit_prod",
        "USER": "postgres",
        "PASSWORD": "password",
        "HOST": "postgresql",
        "PORT": 5432,
    },
}

PGSQL_USER = DATABASES["default"]["USER"]
PGSQL_HOST = DATABASES["default"]["HOST"]
PGSQL_ENVIRONMENT = "prod"


REDIS_HOST = "redis"
REDIS_PORT = 6379
REDIS_DB = 0
