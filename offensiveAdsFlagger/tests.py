# Create your tests here.
import pytest

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


def test_upload_endpoint_post(client, test_audio_file):
    """Make a POST request to the `/api/upload/"""
    with open(test_audio_file, mode="rb") as fp:
        response = client.post('/api/upload', {'name': 'fred', 'attachment': fp})
        assert response.status_code == 200
