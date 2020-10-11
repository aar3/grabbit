from django.db import migrations
from faker import Faker

from lib.const import DEFAULT_PROFILE_IMAGE

fake = Faker()


def seed_brands(apps, _):
    Brand = apps.get_model("core", "Brand")
    count = 20
    for _ in range(count):
        _ = Brand.objects.create(
            name=fake.company(), description=fake.sentence(nb_words=30), image_url=DEFAULT_PROFILE_IMAGE
        )


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0002_seed_users"),
    ]

    operations = [migrations.RunPython(seed_brands)]
