from django.utils import timezone

import boto3
from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods

from offensiveAdsFlagger.aws import S3Client, TranscribeClient
from offensiveAdsFlagger.models import Transcription, AudioAd


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


def example(request):
    json_data = {'confidence': 0.5,
                 "transcript": "How to improve your dining room by the Home Depot,"
                               "New wood floors, new paint on the walls. Sure. You know us for that."
                               " But how about a new dining room table, matching chairs, bar stools?"
                               "How about free and flexible delivery? With easy online returns? Now,"
                               " you can explore decor in a whole new way, Save now on furniture,"
                               " everything for your home, everything from home depot.com."
                               "How doers get more done? Us only valid through September seven"
                               "limitations apply.",
                 'contains_food': False}
    save_audio_with_transcript(json_data)

    return HttpResponse('Successfully saved AudioAds to the Database')


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


def save_audio_with_transcript(json_data):
    transcription = Transcription(1, json_data, json_data['contains_food'], json_data['confidence'])
    transcription.save()
    # myDate = datetime.now()
    myDate = timezone.now()
    audio_ad = AudioAd('1', 'COMPLETED', 'Home Depot: A sign of the times', 'Description of the ad', 'HomeDepot.mp3',
                       myDate, 1)
    audio_ad.save()

    return True


def change_ad_status(request, audio_ad_id):
    """"""
    # TODO (medium priority) allow admins to change the status of Ads
    ad = AudioAd.objects.get(id=audio_ad_id)
    if ad.status == 'Approved':
        ad.status = 'Rejected'
    if ad.status == 'Rejected':
        ad.status = 'Approved'
    ad.save()
    return '200'

def list_audio_ads(request):
    """"""
    # TODO (high priority) list ads for the user
    # (maybe filter based on user but for demo we can probably just list out all the audio ads)
    ads = AudioAd.objects.all()
    return ads

def remove_ad_from_user(request, audio_ad_id):
    """disassociate a user from an add"""
    # TODO (low priority)
