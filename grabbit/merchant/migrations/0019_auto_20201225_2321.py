# Generated by Django 3.1 on 2020-12-25 23:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('merchant', '0018_rewardcode_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='merchant',
            name='alternative_name',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='merchant',
            name='image_url',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='merchant',
            name='invitation_code',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='merchant',
            name='primary_color',
            field=models.CharField(default='#88888', max_length=255),
        ),
    ]
