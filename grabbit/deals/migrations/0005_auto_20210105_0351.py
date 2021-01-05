# Generated by Django 3.1 on 2021-01-05 03:51

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0015_auto_20210103_0046"),
        ("deals", "0004_deal_user"),
    ]

    operations = [
        migrations.RemoveField(model_name="deal", name="user",),
        migrations.CreateModel(
            name="UserDeal",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(default=django.utils.timezone.now, null=True)),
                ("updated_at", models.DateTimeField(null=True)),
                ("deleted_at", models.DateTimeField(null=True)),
                ("deal", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="deals.deal")),
                ("user", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="user.user")),
            ],
            options={"db_table": "user_deals",},
        ),
    ]
