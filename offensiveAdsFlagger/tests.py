# Create your tests here.
import pytest
from offensiveAdsFlagger.models import Transcription, AudioAd

@pytest.fixture
def test_audio_file(pytestconfig):
    return pytestconfig.rootpath / "test" / "data" / "Home_Depot_commercial.mp3"

def test_health_endpoint(client):
    """Check that we get a 200 when the /health endpoint is up and running"""
    response = client.get('/health/')
    assert response.status_code == 200


@pytest.mark.parametrize("method", ["get", "put", "delete"])
def test_upload_endpoint_get(method, client):
    """We're only allowed to send POST requests to the the /offensiveAdsFlagger/upload endpoint"""
    http_method = getattr(client, method)
    response = http_method('/api/upload')
    assert response.status_code == 405


@pytest.mark.django_db
def test_upload_endpoint_post(client, test_audio_file):
    """Make a POST request to the `/api/upload/"""
    with open(test_audio_file, mode="rb") as fp:
        response = client.post(
            "/api/upload",
            {
                "name": "Home Depo Commercial",
                "description": "test description for home depot!",
                "home_depot_test_audio.mp3": fp
            }
        )
        assert response.status_code == 200

        json_data = response.json()

    breakpoint()
    transcription = Transcription.objects.get(id=1)
    audio_ad = AudioAd.objects.get(id=json_data["id"])
    assert audio_ad.title == "Home Depo Commercial"
    assert audio_ad.description == "test description for home depot!"
    assert audio_ad.audio_file_name == "home_depot_test_audio.mp3"
    assert audio_ad.transcription == transcription


def test_download_mp3_file(client):
    # test file that we know exists (yes we should change the name)
    filename = "home_depot_test_audio"
    url = f"api/audio/{filename}"
    breakpoint()
    response = client.get(url)
    assert response.status_code == 200
