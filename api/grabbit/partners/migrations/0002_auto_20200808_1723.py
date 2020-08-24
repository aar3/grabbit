# Generated by Django 3.1 on 2020-08-08 17:23

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("partners", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="user_meta",
            field=models.JSONField(
                default=dict(
                    {
                        "pantSize": "32x32",
                        "shirtSize": "m",
                        "shoeSize": "12.5",
                        "sizeCountry": "US",
                    }
                )
            ),
        ),
        migrations.AddField(
            model_name="user",
            name="username",
            field=models.CharField(default="foxybae101", max_length=255),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="login",
            name="updated_at",
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name="notification",
            name="updated_at",
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name="product",
            name="updated_at",
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name="user", name="updated_at", field=models.DateTimeField(null=True),
        ),
        migrations.CreateModel(
            name="Like",
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
                ("updated_at", models.DateTimeField(null=True)),
                ("deleted_at", models.DateTimeField(null=True)),
                ("liked", models.IntegerField()),
                (
                    "broker",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="broken",
                        to="partners.user",
                    ),
                ),
                (
                    "liked_by",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="partners.user"
                    ),
                ),
                (
                    "merchant",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="merchant",
                        to="partners.user",
                    ),
                ),
                (
                    "product",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="product",
                        to="partners.product",
                    ),
                ),
            ],
            options={"db_table": "likes",},
        ),
    ]