# Generated by Django 3.1 on 2021-01-16 21:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0020_auto_20210116_2100"),
    ]

    operations = [
        migrations.AddField(
            model_name="user", name="invitation_code", field=models.CharField(max_length=255, null=True),
        ),
    ]