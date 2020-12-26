# Generated by Django 3.1 on 2020-12-05 00:43

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("plaid_local", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Link",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(default=django.utils.timezone.now, null=True)),
                ("updated_at", models.DateTimeField(null=True)),
                ("deleted_at", models.DateTimeField(null=True)),
                ("public_token", models.CharField(max_length=255)),
                ("institution_name", models.CharField(max_length=255)),
                ("institution_id", models.CharField(max_length=255)),
                ("accounts", models.JSONField(default=dict)),
                ("link_session_id", models.CharField(max_length=255)),
            ],
            options={"db_table": "links",},
        ),
        migrations.AlterModelTable(name="linktoken", table="link_tokens",),
    ]