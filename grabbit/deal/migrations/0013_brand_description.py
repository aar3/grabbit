# Generated by Django 3.1 on 2021-02-04 00:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("deal", "0012_auto_20210203_1803"),
    ]

    operations = [
        migrations.AddField(model_name="brand", name="description", field=models.TextField(null=True),),
    ]
