# Generated by Django 3.1 on 2021-01-22 01:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0022_auto_20210116_2108"),
    ]

    operations = [
        migrations.RemoveField(model_name="user", name="invitation_code",),
        migrations.RemoveField(model_name="user", name="qr_code_url",),
    ]
