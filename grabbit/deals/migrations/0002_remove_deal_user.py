# Generated by Django 3.1 on 2021-01-05 03:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("deals", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(model_name="deal", name="user",),
    ]