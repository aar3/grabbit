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

LOGGING = {
    "version": 1,
    "disable_existing_loggers": True,
    "formatters": {"standard": {"format": "%(asctime)s [%(levelname)s] %(name)s: %(message)s"},},
    "filters": {
        "require_debug_false": {"()": "django.utils.log.RequireDebugFalse",},
        "require_debug_true": {"()": "django.utils.log.RequireDebugTrue",},
    },
    "handlers": {
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "filters": ["require_debug_true"],
            "formatter": "standard",
            "stream": sys.stderr,
        },
    },
    "loggers": {
        "django": {"handlers": ["console"], "level": "DEBUG", "propagate": True,},
        "django.request": {"handlers": ["console"], "level": "DEBUG", "propagate": False,},
        "gunicorn": {"handlers": ["console"], "level": "DEBUG",},
        "django.db.backends": {"handlers": ["console"], "level": "WARNING", "propagate": False,},
    },
}


REDIS_HOST = "localhost"

DATA_UPLOAD_MAX_MEMORY_SIZE = 1073741824
