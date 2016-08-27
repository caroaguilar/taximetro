from requests import post


API_ENDPOINT = 'http://localhost:5000/api/like_review/{}'


def test_like_review():

    for idreview in range(1, 4):
        for likes in range(5):
            response = post(API_ENDPOINT.format(idreview))
            assert response.status_code == 200

    response = post(API_ENDPOINT.format(10000))
    assert response.status_code == 404
