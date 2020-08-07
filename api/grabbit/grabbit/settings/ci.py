import os

from ._base import *

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "grabbit_dev",
        "USER": "postgres",
        "PASSWORD": "",
        "HOST": "localhost",
        "PORT": 5432,
    },
}


PGSQL_USER = DATABASES["default"]["USER"]
PGSQL_HOST = DATABASES["default"]["HOST"]

PGSQL_ENVIRONMENT = "dev"
