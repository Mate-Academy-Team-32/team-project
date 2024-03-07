import os
import uuid
from django.db import models
from django.db.models import UniqueConstraint
from django.utils.text import slugify
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator


def get_image_file_path(instance, filename):
    _, extension = os.path.splitext(filename)
    filename = f"{slugify(str(instance))}-{uuid.uuid4()}{extension}"
    dirname = f"{slugify(type(instance).__name__)}s/"

    return os.path.join("uploads/", dirname, filename)


class CoreModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    created_by = models.ForeignKey(
        to=get_user_model(),
        editable=False,
        on_delete=models.CASCADE,
        related_name="%(class)s",
    )

    class Meta:
        abstract = True


class Tag(CoreModel):
    name = models.CharField(max_length=64)

    def __str__(self):
        return self.name


class Brand(CoreModel):
    label = models.CharField(max_length=255, unique=True)
    logo_img = models.ImageField(upload_to=get_image_file_path)

    def __str__(self):
        return self.label


class Item(CoreModel):
    class Gender(models.TextChoices):
        FEMALE = "F", "Female"
        MALE = "M", "Male"
        UNISEX = "U", "Unisex"

    class Strength(models.IntegerChoices):
        EDC = 1, "Eau de cologne"
        EDT = 2, "Eau de toilette"
        EDP = 3, "Eau de parfum"
        PERFUME = 4, "Parfum"

    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name="items")
    name = models.CharField(max_length=255)
    logo_img = models.ImageField(null=True, blank=True, upload_to=get_image_file_path)
    gender = models.CharField(choices=Gender.choices, max_length=1)
    strength = models.IntegerField(choices=Strength.choices)
    description = models.TextField()
    release_date = models.DateField(blank=True, null=True)
    country = models.CharField(max_length=64)
    tags = models.ManyToManyField(Tag, related_name="items", blank=True)

    def __str__(self):
        return f"{self.brand}. {self.name}"


class StockItem(CoreModel):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="stock_items")
    volume = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    stock = models.PositiveIntegerField()

    class Meta:
        constraints = [
            UniqueConstraint(fields=["item", "volume"], name="unique_volume_stock_item")
        ]

    def __str__(self):
        return f"{self.item.name} - Vol: {self.volume}, Price: {self.price}, Stock: {self.stock}"


class Review(CoreModel):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="reviews")
    rate = models.PositiveIntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(5)]
    )
    text = models.TextField()

    class Meta:
        constraints = [
            UniqueConstraint(
                fields=["item", "created_by"], name="unique_user_item_review"
            )
        ]

    def __str__(self):
        return f"{self.rate}/5"


class ItemImage(CoreModel):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="item_images")
    image = models.ImageField(null=True, blank=True, upload_to=get_image_file_path)

    def __str__(self):
        return str(self.item)
