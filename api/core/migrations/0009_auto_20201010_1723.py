# Generated by Django 3.1 on 2020-10-10 17:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0008_seed_campaign_code"),
    ]

    operations = [
        migrations.AlterModelTable(name="campaigncode", table="campaign_codes",),
    ]