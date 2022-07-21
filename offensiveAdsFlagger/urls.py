from django.urls import path

from . import views

# TODO (high priority) map urls listed in views.py

urlpatterns = [
    path('', views.index, name='index'),
    path('exampleModel', views.example),
]
