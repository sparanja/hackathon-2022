import json

from django.utils import timezone
import io
import json
import uuid

import boto3
from django.conf import settings
from django.http import HttpResponse, JsonResponse, FileResponse
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
    region_name=settings.AWS_REGION,
)

s3_client = boto3.client(
    "s3",
    aws_access_key_id=settings.AWS_ACCESS_KEY,
    aws_secret_access_key=settings.AWS_SECRET_KEY,
    region_name=settings.AWS_REGION,
)


@require_http_methods(["POST"])
def upload(request):
    """"""
    # TODO (low priority) check if we already processed this file and exit early if we did
    ad_name = request.POST["name"]
    description = request.POST["description"]
    filename = request.POST["fileName"]

    # store the file in s3 (to be determined if we have time)
    s3 = S3Client(s3_client)

    # we're assuming that we only get a single file, which for our app should be the case
    # See the HttpRequest.FILES docs for more details on files:
    # https://docs.djangoproject.com/en/4.0/ref/request-response/#django.http.HttpRequest.FILES
    print(request.POST)
    print(request.FILES)
    _, file_content = list(request.FILES.items())[0]
    s3.upload_file(filename, file_content)

    # kick off the transciption job (job returns an ID)
    transcribe = TranscribeClient(transcribe_client)
    output_file = transcribe.transcribe_file(filename)

    # download the transciption job stored in s3
    json_data = s3.download_transcription_job(output_file)

    # pass the transciption text to the model
    likelihood_of_food = s3.forage_for_food(json_data['transcript'])

    # create entries for the Transciption / AudioAd model
    transcription = Transcription(data=json_data, confidence=likelihood_of_food)
    transcription.save()

    # the output file name is just the {id}.json
    ad_id = output_file.rstrip(".json")

    ad = AudioAd(
        id=ad_id,
        title=ad_name,
        description=description,
        audio_file_name=filename,
        transcription=transcription,
    )
    ad.save()

    # TODO (medium proity) associate the user with this AudioAd

    # return reponse to the user
    json_data["confidence"] = likelihood_of_food
    json_data["id"] = ad_id
    json_data["name"] = ad_name
    json_data["description"] = description
    json_data["fileName"] = filename
    json_data["status"] = ad.status
    return JsonResponse(json_data)


@require_http_methods(["GET"])
def get_s3_file(request, filename):
    s3 = S3Client(s3_client)
    buffer = s3.download_file(filename)
    return FileResponse(buffer, filename=filename)


def save_audio_with_transcript(json_data):
    transcription = Transcription(data=json_data, contains_food=json_data['contains_food'],
                                  confidence=json_data['confidence'])
    transcription.save()
    # myDate = datetime.now()
    myDate = timezone.now()
    audio_ad = AudioAd('1', 'COMPLETED', 'Home Depot: A sign of the times', 'Description of the ad', 'HomeDepot.mp3',
                       myDate, 1)
    audio_ad.save()


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

def converttodict(ad):
    return {
        'id': ad.id,
        'status': ad.status,
        'title': ad.title,
        'description': ad.description,
        'audio_file_name': ad.audio_file_name,
        'uploaded_at': str(ad.uploaded_at),
        'transcription_id': ad.transcription_id
    }


def list_audio_ads(request):
    result = []
    ads = AudioAd.objects.select_related().all()
    for ad in ads:
        temp = {
                "transcription": ad.transcription.data,
                "ad": converttodict(ad)
            }
        result.append(temp)

    return HttpResponse(json.dumps(result))


def remove_ad_from_user(request, audio_ad_id):
    """disassociate a user from an add"""
    # TODO (low priority)
