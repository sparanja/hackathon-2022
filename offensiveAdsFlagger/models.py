from django.db import models
from django.conf import settings
# Create your models here.


class ExampleModel(models.Model):
    id = models.CharField(max_length=50,primary_key=True)
    ad_name = models.TextField(default='Test')
    status = models.TextField(default='ACTIVE')
    audio_file_name = models.TextField(default='test.mp3')
    description = models.TextField(default='Test Description')
    title = models.TextField(default='Test Title')
    transcription = models.TextField(default='Test Transcription')


class Transcription(models.Model):
    """Transcription data for an ad"""
    data = models.JSONField()
    contains_food = models.BooleanField(default=False, help_text="whether this contains food or not")
    confidence = models.FloatField(null=False, help_text="confidence returned by the model")

    class Meta:
        db_table = "audio_transcriptions"

class AudioAd(models.Model):
    STATUS = [
        ("Pending", "Pending"),
        ("Approved", "Approved"),
        ("Rejected", "Rejected"),
    ]
    id = models.CharField(max_length=50, primary_key=True,null=False)
    status = models.CharField(
        max_length=10,
        choices=STATUS,
        default="Pending",
        null=False,
        help_text="The status of the add"
    )
    title = models.CharField(
        max_length=200,
        null=False,
        help_text="The name / title of the ad",
    )
    description = models.CharField(
        max_length=500,
        null=True,
        help_text="A short description of the add",
    )
    audio_file_name = models.CharField(
        max_length=100,
        null=False,
        help_text="Name of the audio file. This will be used as the key when storing in s3"
    )
    uploaded_at = models.DateTimeField(
        auto_now_add=True,
        blank=True,
        help_text="time where we made stroed the transcription",
    )

    transcription = models.ForeignKey(to=Transcription, on_delete=models.CASCADE)

    class Meta:
        db_table = "audio_ads"


    def s3_url(self) -> str:
        """"""
        # TODO implemnt this so that we can return the s3 link to the frontend

class JoinTable(models.Model):
    ad_id = models.ForeignKey(to=AudioAd, on_delete=models.CASCADE)
    user_id = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE)