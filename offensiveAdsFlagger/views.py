import json
import uuid

import boto3
from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods

from offensiveAdsFlagger.models import ExampleModel
from offensiveAdsFlagger.aws import S3Client, TranscribeClient


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


def example(request):
    ex = ExampleModel(1, 'Unified', '234536456')
    ex.save()
    return HttpResponse('Successfully created endpoint!')


# pass the access key and secret key
# set via env variable
transcribe_client = boto3.client(
    "transcribe",
    aws_access_key_id=settings.AWS_ACCESS_KEY,
    aws_secret_access_key=settings.AWS_SECRET_KEY,
)

s3_client = boto3.client(
    "s3",
    aws_access_key_id=settings.AWS_ACCESS_KEY,
    aws_secret_access_key=settings.AWS_SECRET_KEY,
)


@require_http_methods(["POST"])
def upload(request):
    """"""
    # TODO (low priority) check if we already processed this file and exit early if we did

    # store the file in s3 (to be determined if we have time)
    s3 = S3Client(s3_client)

    # we're assuming that we only get a single file, which for our app should be the case
    # See the HttpRequest.FILES docs for more details on files:
    # https://docs.djangoproject.com/en/4.0/ref/request-response/#django.http.HttpRequest.FILES
    filename, file_content = list(request.FILES.items())[0]
    s3.upload_file(filename, file_content)

    # kick off the transciption job (job returns an ID)
    transcribe = TranscribeClient(transcribe_client)
    output_file = transcribe.transcribe_file(filename)

    # download the transciption job stored in s3
    json_data = s3.download_transcription_job(output_file)

    # TODO (high priority) pass the transciption text to the model
    likelihood_of_food = s3.forage_for_food(json_data['transcript'])
    # TODO (high priority) create entries for the Transciption / AudioAd model

    # TODO (medium proity) associate the user with this AudioAd

    # return reponse to the user
    json_data["confidence"] = json_data
    return JsonResponse(json_data)


def change_ad_status(request, audio_ad_id):
    """"""
    # TODO (medium priority) allow admins to change the status of Ads


def list_audio_ads(request):
    """"""
    # TODO (high priority) list ads for the user
    # (maybe filter based on user but for demo we can probably just list out all the audio ads)


def remove_ad_from_user(request, audio_ad_id):
    """disassociate a user from an add"""
    # TODO (low priority)
