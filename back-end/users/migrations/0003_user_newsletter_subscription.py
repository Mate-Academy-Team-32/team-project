# Generated by Django 5.0.1 on 2024-02-20 11:38

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0002_rename_name_user_first_name_user_last_name"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="newsletter_subscription",
            field=models.BooleanField(default=True),
        ),
    ]
