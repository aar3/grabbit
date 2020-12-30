# Generated by Django 3.1 on 2020-12-30 21:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0007_auto_20201229_1831"),
    ]

    operations = [
        migrations.AddField(
            model_name="notification", name="icon", field=models.CharField(default="user", max_length=255),
        ),
        migrations.AddField(model_name="setting", name="targeting_enabled", field=models.IntegerField(default=1),),
    ]
