import os
import sys
import pathlib
from ._base import *


DEBUG = False
SECRET_KEY = None

#################################################################
# Postgres
#################################################################

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "grabbit",
        "USER": "postgres",
        "PASSWORD": "",
        "HOST": "localhost",
        "PORT": 5432,
    },
}

