import datetime as dt
import hashlib
import redis
from django.conf import settings
from django.utils import timezone
from lib.utils import random_string

DefaultRedis = redis.Redis(host=settings.REDIS_HOST, port=settings.REDIS_DEFAULT_PORT)

CacheLayerRedis = redis.Redis(host=settings.REDIS_HOST, port=settings.REDIS_CACHE_LAYER_PORT)
