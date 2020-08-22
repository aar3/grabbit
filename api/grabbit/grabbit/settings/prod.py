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

SOURCE_DIR = os.path.dirname(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
)
LOGS_DIR = pathlib.Path(os.path.join(SOURCE_DIR, "grabbit", "logs"))
LOGS_DIR.mkdir(exist_ok=True)


LOGGING = {
    "version": 1,
    "disable_existing_loggers": True,
    "formatters": {
        "standard": {"format": "%(asctime)s [%(levelname)s] %(name)s: %(message)s"},
    },
    "filters": {
        "require_debug_false": {"()": "django.utils.log.RequireDebugFalse",},
        "require_debug_true": {"()": "django.utils.log.RequireDebugTrue",},
    },
    "handlers": {
        # "console": {
        #     "level": "DEBUG",
        #     "class": "logging.StreamHandler",
        #     "filters": ["require_debug_true"],
        #     "formatter": "standard",
        #     "stream": sys.stderr,
        # },
        "file": {
            "level": "DEBUG",
            "class": "logging.FileHandler",
            "filters": ["require_debug_true"],
            "filename": os.path.join(LOGS_DIR, "grabbit.log"),
            "formatter": "standard",
        },
        "logdna": {
            "class": "logdna.LogDNAHandler",
            "key": os.environ["LOGDNA_INGESTION_KEY"],
            "filters": ["require_debug_false"],
            "options": {"hostname": "your-website-name", "index_meta": True},
        },
    },
    "loggers": {
        "django": {"handlers": ["console"], "level": "DEBUG", "propagate": True,},
        "django.request": {
            "handlers": ["console", "file"],
            "level": "DEBUG",
            "propagate": False,
        },
        "gunicorn": {"handlers": ["file", "console"], "level": "DEBUG",},
        "django.db.backends": {
            "handlers": ["console", "file"],
            "level": "WARNING",
            "propagate": False,
        },
    },
}