# Generated by Django 4.1.7 on 2023-04-19 08:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_alter_myuser_age_alter_myuser_gender_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='myuser',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
