import datetime as dt
import hashlib

import redis
from django.conf import settings

from grabbit.utils import random_string


RedisClient = redis.Redis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=settings.REDIS_DB)


class SessionToken:
    def __init__(self, **kwargs):
        self.key = self._make_key()
        self.user_id = kwargs.get("user_id")
        self._expiry = dt.datetime.now() + dt.timedelta(hours=12)

        if kwargs.get("data"):
            self.deserialize(kwargs["data"])

    def expired(self):
        return dt.datetime.now() >= self._expiry

    def serialize(self):
        expiry = self._expiry.strftime("%Y-%m-%d %H:%M:%S")
        return "\x001".join([self.key, str(self.user_id), expiry]).encode()

    def deserialize(self, data):
        key, user_id, expiry = data.decode().split("\x001")
        self.key = key
        self.user_id = int(user_id)
        self._expiry = dt.datetime.strptime(expiry, "%Y-%m-%d %H:%M:%S")

    def _make_key(self):
        s = random_string(n=40)
        return hashlib.sha256(s.encode()).hexdigest()

    def __eq__(self, other):
        return self.key == other.key
