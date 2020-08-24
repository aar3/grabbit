# pylint: disable=import-outside-toplevel

from django.db import models
from django.shortcuts import get_object_or_404


class BaseManager(models.Manager):
    pass


class UserManager(BaseManager):
    # pylint: disable=redefined-builtin
    def create(self, email, name, secret, type, phone, username):

        user = self.model(
            email=email, name=name, phone=phone, type=type, username=username
        )

        user.set_salt()
        user.set_secret(secret)
        user.save()

        return user


class LoginManager(BaseManager):
    def create(self, user, ip_address):
        return super().create(user=user, ip_address=ip_address)


class ProductManager(BaseManager):
    def create(
        self,
        name,
        description,
        user,
        image_url_1=None,
        image_url_2=None,
        image_url_3=None,
        image_url_4=None,
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
    def create(self, text, user):
        return super().create(text=text, user=user)


class LikeManager(BaseManager):
    def create(self, liked_by, like_for, merchant=None, product=None, broker=None):
        from partners.models import LikeFor, User, Product

        liked_by = get_object_or_404(User, pk=liked_by)

        if like_for == LikeFor.Merchant:
            merchant = get_object_or_404(User, pk=merchant)
            return super().create(
                liked_by=liked_by,
                like_for=like_for,
                merchant=merchant,
                product=product,
                broker=broker,
            )

        if like_for == LikeFor.Broker:
            broker = get_object_or_404(User, pk=broker)
            return super().create(
                liked_by=liked_by,
                like_for=like_for,
                broker=broker,
                product=product,
                merchant=merchant,
            )

        product = get_object_or_404(Product, pk=product)
        return super().create(
            liked_by=liked_by,
            like_for=like_for,
            product=product,
            merchant=merchant,
            broker=broker,
        )
