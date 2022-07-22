"""hackathon2022 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.contrib import admin
from django.http import JsonResponse
from django.urls import path, include


def health(request):
    """Health endpoint that we can use to check the status of the server / various configuration values"""
    http_host = request.META.get('HTTP_HOST')
    database = settings.DATABASES["default"]
    response = {
        "host": http_host,
        "db": {
            "engine": database["ENGINE"],
            "database_name": database["NAME"],
            "user": database["USER"],
            "host": database["HOST"],
            "port": database["PORT"],
        }
    }
    return JsonResponse(response, json_dumps_params={"indent": 4})


urlpatterns = [
    path('api/', include('offensiveAdsFlagger.urls')),
    path('admin/', admin.site.urls),
    path("health/", health)
]
