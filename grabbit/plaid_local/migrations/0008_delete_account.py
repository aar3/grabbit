# Generated by Django 3.1 on 2020-12-28 20:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("plaid_local", "0007_account"),
    ]

    operations = [
        migrations.DeleteModel(name="Account",),
    ]
