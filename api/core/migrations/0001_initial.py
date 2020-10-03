# Generated by Django 3.1 on 2020-10-02 03:42

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Conversation",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(default=django.utils.timezone.now, null=True)),
                ("updated_at", models.DateTimeField(null=True)),
                ("deleted_at", models.DateTimeField(null=True)),
            ],
            options={"db_table": "conversations",},
        ),
        migrations.CreateModel(
            name="Grab",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(default=django.utils.timezone.now, null=True)),
                ("updated_at", models.DateTimeField(null=True)),
                ("deleted_at", models.DateTimeField(null=True)),
                ("expiry", models.DateTimeField()),
                ("additional_comments", models.TextField()),
            ],
            options={"db_table": "grabs",},
        ),
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
                ("session_token_key", models.CharField(max_length=255)),
                ("user_meta", models.JSONField(default=dict)),
                ("type", models.CharField(max_length=255)),
                ("site_url", models.CharField(max_length=255, null=True)),
                (
                    "profile_image_url",
                    models.CharField(
                        default="https://www.teamunhcr.org.au/images/empty-profile-image.jpg", max_length=255
                    ),
                ),
            ],
            options={"db_table": "users", "unique_together": {("salt", "secret")},},
        ),
        migrations.CreateModel(
            name="Shipment",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(default=django.utils.timezone.now, null=True)),
                ("updated_at", models.DateTimeField(null=True)),
                ("deleted_at", models.DateTimeField(null=True)),
                ("carrier", models.IntegerField()),
                ("tracking_number", models.CharField(max_length=255)),
                ("expected_delivery", models.DateTimeField()),
                ("grab", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="core.grab")),
            ],
            options={"db_table": "shipments",},
        ),
        migrations.CreateModel(
            name="Product",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(default=django.utils.timezone.now, null=True)),
                ("updated_at", models.DateTimeField(null=True)),
                ("deleted_at", models.DateTimeField(null=True)),
                ("name", models.CharField(max_length=255)),
                ("description", models.TextField()),
                ("terms", models.TextField()),
                ("image_url_1", models.CharField(max_length=255, null=True)),
                ("image_url_2", models.CharField(max_length=255, null=True)),
                ("image_url_3", models.CharField(max_length=255, null=True)),
                ("image_url_4", models.CharField(max_length=255, null=True)),
                ("merchant", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="core.user")),
            ],
            options={"db_table": "products",},
        ),
        migrations.CreateModel(
            name="Offer",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(default=django.utils.timezone.now, null=True)),
                ("updated_at", models.DateTimeField(null=True)),
                ("deleted_at", models.DateTimeField(null=True)),
                ("uid", models.CharField(max_length=255)),
                (
                    "offeree",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name="offeree", to="core.user"
                    ),
                ),
                (
                    "offerer",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name="offerer", to="core.user"
                    ),
                ),
                ("product", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="core.product")),
            ],
            options={"db_table": "offers",},
        ),
        migrations.CreateModel(
            name="Notification",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(default=django.utils.timezone.now, null=True)),
                ("updated_at", models.DateTimeField(null=True)),
                ("deleted_at", models.DateTimeField(null=True)),
                ("text", models.CharField(max_length=255)),
                ("seen", models.BooleanField(default=False)),
                ("item_type", models.IntegerField()),
                ("_item_route_key", models.CharField(db_column="item_route_key", max_length=255)),
                ("item", models.JSONField(default=dict)),
                ("user", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="core.user")),
            ],
            options={"db_table": "notifications",},
        ),
        migrations.CreateModel(
            name="Message",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(default=django.utils.timezone.now, null=True)),
                ("updated_at", models.DateTimeField(null=True)),
                ("deleted_at", models.DateTimeField(null=True)),
                ("text", models.TextField()),
                (
                    "conversation",
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="core.conversation"),
                ),
                (
                    "recipient",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name="recipient", to="core.user"
                    ),
                ),
                (
                    "sender",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name="sender", to="core.user"
                    ),
                ),
            ],
            options={"db_table": "messages",},
        ),
        migrations.CreateModel(
            name="Login",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(default=django.utils.timezone.now, null=True)),
                ("updated_at", models.DateTimeField(null=True)),
                ("deleted_at", models.DateTimeField(null=True)),
                ("ip_address", models.CharField(max_length=255)),
                ("user", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="core.user")),
            ],
            options={"db_table": "logins",},
        ),
        migrations.AddField(
            model_name="grab",
            name="offer",
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="core.offer"),
        ),
        migrations.AddField(
            model_name="conversation",
            name="person_a",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, related_name="person_a", to="core.user"
            ),
        ),
        migrations.AddField(
            model_name="conversation",
            name="person_b",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, related_name="person_b", to="core.user"
            ),
        ),
        migrations.CreateModel(
            name="AttributionStat",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(default=django.utils.timezone.now, null=True)),
                ("updated_at", models.DateTimeField(null=True)),
                ("deleted_at", models.DateTimeField(null=True)),
                ("metric_json", models.JSONField(default=dict)),
                (
                    "broker",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name="broker", to="core.user"
                    ),
                ),
                (
                    "merchant",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name="merchant", to="core.user"
                    ),
                ),
                ("product", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="core.product")),
            ],
            options={"db_table": "attribution_stats",},
        ),
    ]