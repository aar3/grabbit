import datetime as dt
import hashlib
import redis
from django.conf import settings
from django.utils import timezone
from lib.utils import random_string


def get_redis_instance(host, port):
    return redis.Redis(host=host, port=port)
