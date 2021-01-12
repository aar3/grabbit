# pylint: disable=unused-argument
from django.db import models
from django.utils import timezone
from lib.managers import BaseManager


class BaseModel(models.Model):
    class Meta:
        abstract = True

    use_in_migrations = True
    paranoid = True
    objects = BaseManager()

    created_at = models.DateTimeField(default=timezone.now, null=True)
    updated_at = models.DateTimeField(null=True)
    deleted_at = models.DateTimeField(null=True)

    # pylint: disable=arguments-differ
    def delete(self):
        self.updated_at = timezone.now
        self.deleted_at = timezone.now
        self.save()
