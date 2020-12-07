from django.db import models
from lib.managers import BaseManager


class UserManager(BaseManager):
    def create(self, email, name, secret, phone, username, user_type=0, address_line1=None, address_line2=None):

        user = self.model(
            email=email,
            name=name,
            phone=phone,
            user_type=user_type,
            username=username,
            address_line1=address_line1,
            address_line2=address_line2,
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
