from django.db import models
from lib.managers import BaseManager


class UserManager(BaseManager):
    def create(self, email, secret, phone, invitation_code):
        user = self.model(email=email, phone=phone, invitation_code=invitation_code)
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
