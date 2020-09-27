# pylint: disable=import-outside-toplevel

from django.db import models
from django.shortcuts import get_object_or_404


class BaseManager(models.Manager):
    pass


class UserManager(BaseManager):
    # pylint: disable=redefined-builtin
    def create(self, email, name, secret, type, phone, username):

        user = self.model(email=email, name=name, phone=phone, type=type, username=username)

        user.set_salt()
        user.set_secret(secret)
        user.save()

        return user


class LoginManager(BaseManager):
    def create(self, user, ip_address):
        return super().create(user=user, ip_address=ip_address)


class ProductManager(BaseManager):
    def create(
        self, name, description, user, image_url_1=None, image_url_2=None, image_url_3=None, image_url_4=None,
    ):

        from partners.models import User

        user = get_object_or_404(User, pk=user)

        return super().create(
            name=name,
            description=description,
            user=user,
            image_url_1=image_url_1,
            image_url_2=image_url_2,
            image_url_3=image_url_3,
            image_url_4=image_url_4,
        )


class NotificationManager(BaseManager):
    def create(self, text, user, item_type, item_id):
        noti = super().create(text=text, user=user)
        noti.set_meta(item_type, item_id)

        noti.save()
        return noti
