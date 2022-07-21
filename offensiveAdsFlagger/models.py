from django.db import models

# Create your models here.


class ExampleModel(models.Model):
    name = models.CharField(max_length=150)
    phone = models.CharField(max_length=10)
