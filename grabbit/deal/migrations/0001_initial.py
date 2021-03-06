# Generated by Django 3.1 on 2021-01-21 02:11

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("user", "0022_auto_20210116_2108"),
    ]

    operations = [
        migrations.CreateModel(
            name="Deal",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(default=django.utils.timezone.now, null=True)),
                ("updated_at", models.DateTimeField(null=True)),
                ("deleted_at", models.DateTimeField(null=True)),
                ("title", models.TextField()),
                ("current_value", models.CharField(max_length=255)),
                ("original_value", models.CharField(max_length=255)),
                ("merchant_name", models.CharField(max_length=255)),
                ("url", models.TextField()),
                ("category", models.JSONField(default=list)),
                ("scraper", models.CharField(max_length=255)),
                (
                    "img_url",
                    models.CharField(
                        default="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg",
                        max_length=255,
                    ),
                ),
                ("product_keywords", models.JSONField(default=list)),
                ("all_img_urls", models.JSONField(default=list)),
                ("description", models.TextField(null=True)),
                ("uid", models.CharField(max_length=255)),
            ],
            options={"db_table": "deals",},
        ),
        migrations.CreateModel(
            name="MatchedDeal",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(default=django.utils.timezone.now, null=True)),
                ("updated_at", models.DateTimeField(null=True)),
                ("deleted_at", models.DateTimeField(null=True)),
                ("is_on_watchlist", models.IntegerField(default=0)),
                ("deal", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="deal.deal")),
                ("user", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="user.user")),
            ],
            options={"db_table": "matched_deals",},
        ),
    ]
