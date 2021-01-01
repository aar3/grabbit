# pylint: disable=unused-argument

from django.db import models
from django.utils import timezone

from lib.managers import *


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
        self.deleted_at = timezone.now
        super().delete()

    def to_dict(self):
        return dict([(field.verbose_name, field.value_from_object(self)) for field in self.__class.__meta.fields])