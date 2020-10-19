from django.db import migrations
from faker import Faker

from lib.const import DEFAULT_PROFILE_IMAGE

fake = Faker()


def seed_brands(apps, _):
    print("Seeding brands")
    Brand = apps.get_model("core", "Brand")
    count = 20
    for _ in range(count):
        _ = Brand.objects.create(
            name=fake.company(), description=fake.sentence(nb_words=30), image_url=DEFAULT_PROFILE_IMAGE
        )

    # add merchant superuser
    _ = Brand.objects.create(
        name="True Religion",
        description="""Based out of Los Angeles California, True Religion (LLC) is
    a brand that simply makes dope clothes. We make bespoke outfits to fit any occassion. Email us at hi@truereligion.com for more info""",
        image_url=DEFAULT_PROFILE_IMAGE,
    )


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0002_seed_users"),
    ]

    operations = [migrations.RunPython(seed_brands)]
