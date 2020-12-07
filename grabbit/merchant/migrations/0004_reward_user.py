# Generated by Django 3.1 on 2020-12-05 22:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0001_initial"),
        ("merchant", "0003_reward_is_active"),
    ]

    operations = [
        migrations.AddField(
            model_name="reward",
            name="user",
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to="user.user"),
            preserve_default=False,
        ),
    ]
