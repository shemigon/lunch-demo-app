from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class TimeStampedModel(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class FoodType(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Restaurant(TimeStampedModel):
    name = models.CharField(max_length=300)
    food_types = models.ManyToManyField(to=FoodType)
    address = models.CharField(max_length=1000)
    rating = models.PositiveSmallIntegerField(default=0, validators=[
        MinValueValidator(0),
        MaxValueValidator(5)
    ])

    def __str__(self):
        return self.name
