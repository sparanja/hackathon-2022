from django.urls import path

from . import views

# TODO (high priority) map urls listed in views.py

urlpatterns = [
    path('', views.index, name='index'),
    path('exampleModel', views.example),
    path('listAudioAds', views.list_audio_ads),
    path("upload", view=views.upload, name="upload"),
    path("audio/<filename>", view=views.get_s3_file, name="get-s3-file")
]
