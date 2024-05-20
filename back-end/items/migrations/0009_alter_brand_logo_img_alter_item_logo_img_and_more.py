# Generated by Django 5.0.1 on 2024-05-20 16:39

import items.models
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("items", "0008_alter_note_created_by"),
    ]

    operations = [
        migrations.AlterField(
            model_name="brand",
            name="logo_img",
            field=models.ImageField(
                blank=True,
                max_length=255,
                null=True,
                upload_to=items.models.get_image_file_path,
            ),
        ),
        migrations.AlterField(
            model_name="item",
            name="logo_img",
            field=models.ImageField(
                blank=True,
                max_length=255,
                null=True,
                upload_to=items.models.get_image_file_path,
            ),
        ),
        migrations.AlterField(
            model_name="itemimage",
            name="image",
            field=models.ImageField(
                blank=True,
                max_length=255,
                null=True,
                upload_to=items.models.get_image_file_path,
            ),
        ),
    ]
