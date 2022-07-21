from django.db import models

# Create your models here.


class ExampleModel(models.Model):
    id = models.CharField(max_length=50,primary_key=True)
    ad_name = models.TextField()
    status = models.TextField()
    audio_file_name = models.TextField()
    description = models.TextField()
    title = models.TextField()
    transcription = models.TextField()

