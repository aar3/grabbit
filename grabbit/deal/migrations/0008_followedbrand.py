# Generated by Django 3.1 on 2021-01-31 23:10

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0024_auto_20210129_0211"),
        ("deal", "0007_brand"),
    ]

    operations = [
        migrations.CreateModel(
            name="FollowedBrand",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(default=django.utils.timezone.now, null=True)),
                ("updated_at", models.DateTimeField(null=True)),
                ("deleted_at", models.DateTimeField(null=True)),
                ("brand", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="deal.brand")),
                ("user", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="user.user")),
            ],
            options={"db_table": "followed_brands",},
        ),
    ]
