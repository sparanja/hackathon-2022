from django.contrib import admin
from offensiveAdsFlagger.models import Transcription, AudioAd

# Register your models here.

admin.site.register(Transcription)
admin.site.register(AudioAd)
