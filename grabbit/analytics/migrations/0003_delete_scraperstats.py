# Generated by Django 3.1 on 2021-01-12 03:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("analytics", "0002_scraperstats_name"),
    ]

    operations = [
        migrations.DeleteModel(name="ScraperStats",),
    ]
