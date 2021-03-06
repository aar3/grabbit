# Generated by Django 3.1 on 2021-01-03 00:04

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0011_notification_metadata"),
    ]

    operations = [
        migrations.CreateModel(
            name="Profile",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(default=django.utils.timezone.now, null=True)),
                ("updated_at", models.DateTimeField(null=True)),
                ("deleted_at", models.DateTimeField(null=True)),
                ("keywords", models.JSONField(default=dict)),
                ("user", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="user.user")),
            ],
            options={"abstract": False,},
        ),
    ]
