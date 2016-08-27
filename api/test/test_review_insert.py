from json import dumps

from requests import post


API_ENDPOINT = 'http://localhost:5000/api/submit_review/TSJ-001631'
REVIEW_DUMMY_DATA = [
    {
        'rating': 5,
        'content': 'Excelente taxista! Muy buen servicio.',
        'fbid': 100009410315274,
        'fbname': 'Carlos Jenkins'
    }, {
        'rating': 1,
        'content': 'Es mae se chulió mi celular!',
        'fbid': 100009410315274,
        'fbname': 'Carlos Jenkins'
    }, {
        'rating': 2,
        'content': 'Creo que anda con la maría alterada!',
        'fbid': 100009410315274,
        'fbname': 'Carlos Jenkins'
    }
]


def test_review_insert():
    for review in REVIEW_DUMMY_DATA:
        response = post(
            API_ENDPOINT,
            data=dumps(review),
            headers={'content-type': 'application/json'}
        )
        assert response.status_code == 200
