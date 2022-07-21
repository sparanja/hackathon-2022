import uuid

import boto3
from django.conf import settings
from django.http import HttpResponse

from offensiveAdsFlagger.models import ExampleModel


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


def example(request):
    ex = ExampleModel(1, 'Unified', '234536456')
    ex.save()
    return HttpResponse('Successfully created endpoint!')


# pass the access key and secret key
# set via env variable
transcribe = boto3.client(
    "transcribe",
    aws_access_key_id=settings.AWS_ACCESS_KEY,
    aws_secret_access_key=settings.AWS_SECRET_KEY,
)

s3 = boto3.client(
    "s3",
    aws_access_key_id=settings.AWS_ACCESS_KEY,
    aws_secret_access_key=settings.AWS_SECRET_KEY,
)

def upload(request):
    """"""
    # get a post request

    # check if we already processed this file and exit early if we did

    # store the file in s3 (to be determined if we have time)

    # kick off the transciption job (job returns an ID)
    response = transcribe.start_transcription_job(
        # Unique ID for each job. If we try to start a job with the same
        # name as an existing job then a ConflictException is raised
        TranscriptionJobName=str(uuid.uuid4()),
        # Assume we're always using english.
        LanguageCode='en-US',
        # Assume we're always using mp3 files
        MediaFormat='mp3',
        Media={
            'MediaFileUri': object_url
        },
        OutputBucketName=OUTPUT_BUCKET,
        OutputKey=output_file_name(file_name),
    )

    transciption_id = response["id"]

    # use the ID to poll the transcription service until the job is ready

    # once the job is done pull the transciption from s3

    # pass the transciption text to the model

    # create entries for the Transciption / AudioAd model

    # return reponse to the user
