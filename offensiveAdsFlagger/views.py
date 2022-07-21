from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse

from offensiveAdsFlagger.models import ExampleModel


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


def example(request):
    ex = ExampleModel(1, 'Unified', '234536456')
    ex.save()
    return HttpResponse('Successfully created endpoint!')
