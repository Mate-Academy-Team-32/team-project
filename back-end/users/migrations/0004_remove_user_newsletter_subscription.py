# Generated by Django 5.0.1 on 2024-03-29 15:01

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0003_user_newsletter_subscription"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="user",
            name="newsletter_subscription",
        ),
    ]