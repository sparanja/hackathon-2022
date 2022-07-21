import uuid

import boto3
from django.conf import settings
from django.http import HttpResponse
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
    # get a post request

    # check if we already processed this file and exit early if we did

    # store the file in s3 (to be determined if we have time)
    s3 = S3Client(s3_client)

    # we're assuming that we only get a single file, which for our app should be the case
    # See the HttpRequest.FILES docs for more details on files:
    # https://docs.djangoproject.com/en/4.0/ref/request-response/#django.http.HttpRequest.FILES
    fileanme, file_content = list(request.FILES.items())[0]
    s3.upload_file(fileanme, file_content)

    # kick off the transciption job (job returns an ID)
    transcribe = TranscribeClient(transcribe_client)
    output_file = transcribe.transcribe_file(filename)

    # download the transciption job stored in s3
    json_data = s3.download_transcription_job(output_file)

    transciption_id = response["id"]

    # use the ID to poll the transcription service until the job is ready

    # once the job is done pull the transciption from s3

    # pass the transciption text to the model

    # create entries for the Transciption / AudioAd model

    # return reponse to the user
