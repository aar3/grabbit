# Generated by Django 3.1 on 2020-12-06 00:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("merchant", "0004_reward_user"),
    ]

    operations = [
        migrations.AddField(
            model_name="reward", name="amount", field=models.IntegerField(default=5), preserve_default=False,
        ),
        migrations.AddField(model_name="reward", name="qr_code", field=models.CharField(max_length=255, null=True),),
    ]