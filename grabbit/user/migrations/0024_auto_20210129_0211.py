# Generated by Django 3.1 on 2021-01-29 02:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0023_auto_20210122_0108"),
    ]

    operations = [
        migrations.AlterField(model_name="user", name="email", field=models.CharField(max_length=255, null=True),),
        migrations.AlterField(
            model_name="user",
            name="phone",
            field=models.CharField(default="+15555555555", max_length=255, unique=True),
            preserve_default=False,
        ),
    ]