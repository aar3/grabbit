# pylint: disable=import-outside-toplevel

from django.db import models

from lib.const import DEFAULT_PROFILE_IMAGE


class BaseManager(models.Manager):
    pass


class UserManager(BaseManager):
    # pylint: disable=redefined-builtin
    def create(self, email, name, secret, type, phone, username, address_line1=None, address_line2=None):

        user = self.model(
            email=email,
            name=name,
            phone=phone,
            type=type,
            username=username,
            address_line1=address_line1,
            address_line2=address_line2,
        )

        user.set_salt()
        user.set_secret(secret)
        user.save()

        return user


class BrandManager(BaseManager):
    def create(self, name, description, image_url=DEFAULT_PROFILE_IMAGE):
        brand = super().create(name=name, description=description, image_url=image_url)
        brand.set_secret()
        brand.set_slug()
        return brand


class LoginManager(BaseManager):
    def create(self, user, ip_address):
        return super().create(user=user, ip_address=ip_address)


class NotificationManager(BaseManager):
    def create(self, text, user, item_type, item_id):
        return super().create(text=text, user=user).set_meta(item_type, item_id)
