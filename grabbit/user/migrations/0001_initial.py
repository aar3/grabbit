# Generated by Django 3.1 on 2020-12-01 23:52

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(default=django.utils.timezone.now, null=True)),
                ("updated_at", models.DateTimeField(null=True)),
                ("deleted_at", models.DateTimeField(null=True)),
                ("email", models.CharField(max_length=255, unique=True)),
                ("name", models.CharField(max_length=255, null=True)),
                ("username", models.CharField(max_length=255)),
                ("address_line1", models.CharField(max_length=255, null=True)),
                ("address_line2", models.CharField(max_length=255, null=True)),
                ("phone", models.CharField(max_length=255, null=True)),
                ("secret", models.CharField(max_length=255)),
                ("salt", models.IntegerField()),
                ("current_session_token", models.CharField(max_length=255)),
                ("user_meta", models.JSONField(default=dict)),
                ("user_type", models.IntegerField()),
                ("qr_code_url", models.CharField(max_length=255)),
            ],
            options={"db_table": "users", "unique_together": {("salt", "secret")},},
        ),
    ]