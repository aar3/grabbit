# Generated by Django 3.1 on 2020-10-10 17:15

import string
import random
import datetime as dt

from django.db import migrations
from faker import Faker


fake = Faker()


def fake_code():
    chars = list(string.ascii_uppercase + string.digits)
    return "".join([random.choice(chars) for _ in range(6)])


def fill_campaign_code_data(apps, _):
    code_counts = 20
    Brand = apps.get_model("core", "Brand")
    brands = Brand.objects.all()

    for brand in brands:
        for i in range(code_counts):
            print("Creating campaign code %d for brand %s", i, brand.name)
            CampaignCode = apps.get_model("core", "CampaignCode")
            expiry = dt.datetime.now() + dt.timedelta(days=7)
            _ = CampaignCode.objects.create(brand=brand, code=fake_code(), expiry=expiry)


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0007_campaigncode_expiry"),
    ]

    operations = [migrations.RunPython(fill_campaign_code_data)]