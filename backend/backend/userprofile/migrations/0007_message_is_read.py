# Generated by Django 4.1.7 on 2023-06-04 06:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userprofile', '0006_chat_message'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='is_read',
            field=models.BooleanField(default=False),
        ),
    ]
