# -*- coding: utf-8 -*-

from json import dumps

from flask import Flask
from flask_cors import cross_origin


app = Flask('taximetro')


@app.route('/api/find_taxi/<string:plate>')
@cross_origin()
def find_taxi(plate):
    return dumps({
        'plate': plate,
        'stars': 3,
        'name': 'Carlos Andrés',
        'lastname1': 'Sandi',
        'lastname2': 'Madrigal',
        'idnum': '113460645',
        'base': '001123 Grecia',
        'service': 'Sedan',
        'reviews': [
            {
                'content': 'Excelente servicio de Taxi!',
                'user': 'Antonio Restrepo',
                'likes': 10
            },
            {
                'content': 'La maría está alterada',
                'user': 'Juliana Perez',
                'likes': 6
            },
        ]
    })
