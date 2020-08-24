# Generated by Django 3.1 on 2020-08-08 00:50

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "created_at",
                    models.DateTimeField(default=django.utils.timezone.now, null=True),
                ),
                (
                    "updated_at",
                    models.DateTimeField(default=django.utils.timezone.now, null=True),
                ),
                ("deleted_at", models.DateTimeField(null=True)),
                ("email", models.CharField(max_length=255)),
                ("name", models.CharField(max_length=255, null=True)),
                ("phone", models.CharField(max_length=255, null=True)),
                ("secret", models.CharField(max_length=255)),
                ("salt", models.IntegerField()),
                ("session_token_key", models.CharField(max_length=255)),
                ("type", models.CharField(max_length=255)),
                (
                    "profile_image_url",
                    models.CharField(
                        default="https://www.teamunhcr.org.au/images/empty-profile-image.jpg",
                        max_length=255,
                    ),
                ),
            ],
            options={"db_table": "users", "unique_together": {("salt", "secret")},},
        ),
        migrations.CreateModel(
            name="Product",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "created_at",
                    models.DateTimeField(default=django.utils.timezone.now, null=True),
                ),
                (
                    "updated_at",
                    models.DateTimeField(default=django.utils.timezone.now, null=True),
                ),
                ("deleted_at", models.DateTimeField(null=True)),
                ("name", models.CharField(max_length=255)),
                ("description", models.TextField()),
                ("image_url_1", models.CharField(max_length=255, null=True)),
                ("image_url_2", models.CharField(max_length=255, null=True)),
                ("image_url_3", models.CharField(max_length=255, null=True)),
                ("image_url_4", models.CharField(max_length=255, null=True)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="partners.user"
                    ),
                ),
            ],
            options={"db_table": "products",},
        ),
        migrations.CreateModel(
            name="Notification",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "created_at",
                    models.DateTimeField(default=django.utils.timezone.now, null=True),
                ),
                (
                    "updated_at",
                    models.DateTimeField(default=django.utils.timezone.now, null=True),
                ),
                ("deleted_at", models.DateTimeField(null=True)),
                ("text", models.CharField(max_length=255)),
                ("seen", models.BooleanField(default=False)),
                (
                    "user",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="partners.user",
                    ),
                ),
            ],
            options={"db_table": "notifications",},
        ),
        migrations.CreateModel(
            name="Login",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "created_at",
                    models.DateTimeField(default=django.utils.timezone.now, null=True),
                ),
                (
                    "updated_at",
                    models.DateTimeField(default=django.utils.timezone.now, null=True),
                ),
                ("deleted_at", models.DateTimeField(null=True)),
                ("ip_address", models.CharField(max_length=255)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="partners.user"
                    ),
                ),
            ],
            options={"db_table": "logins",},
        ),
    ]
