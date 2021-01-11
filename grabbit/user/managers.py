from django.db import models
from lib.managers import BaseManager


class UserManager(BaseManager):
    # kwargs includes invitation_code
    def create(
        self, email, name, secret, phone, username, *args, **kwargs
    ):

        user = self.model(
            email=email,
            name=name,
            phone=phone,
            username=username,
        )

        user.set_salt()
        user.set_secret(secret)
        user.save()

        return user


class NotificationManager(BaseManager):
    def create(self, user, text):
        instance = self.model(user, text)
        instance.set_expiry()
        instance.save()
        return instance
