# Generated by Django 3.1 on 2020-12-05 21:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("merchant", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="reward",
            name="merchant",
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to="merchant.merchant"),
            preserve_default=False,
        ),
    ]