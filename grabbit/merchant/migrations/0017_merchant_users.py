# Generated by Django 3.1 on 2020-12-07 00:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0005_auto_20201206_0005"),
        ("merchant", "0016_auto_20201207_0019"),
    ]

    operations = [
        migrations.AddField(model_name="merchant", name="users", field=models.ManyToManyField(to="user.User"),),
    ]
