# Generated by Django 3.1 on 2020-12-06 17:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("merchant", "0006_auto_20201206_1743"),
    ]

    operations = [
        migrations.AddField(model_name="campaign", name="is_active", field=models.BooleanField(default=True),),
    ]