#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from json import loads
from os.path import abspath, dirname, join

from pymysql import connect, cursors
from pymysql.cursors import DictCursor

from flask import Flask, jsonify, make_response, request
from flask_cors import cross_origin


QUERY_FIND_TAXI = (
    'SELECT '
    'idtaxi, base, idnum, lastname1, lastname2, name, plate, service '
    'FROM taxi WHERE taxi.plate = %s;'
)

QUERY_GET_REVIEWS = (
    'SELECT '
    'idreview, taxi_idtaxi, rating, content, likes, fbid, fbname '
    'FROM review WHERE review.taxi_idtaxi = %s '
    'ORDER BY rating DESC;'
)

QUERY_SUBMIT_REVIEW = (
    'INSERT INTO review '
    '(taxi_idtaxi, rating, content, likes, fbid, fbname) '
    'VALUES (%s, %s, %s, %s, %s, %s);'
)


def injectdb(method):
    """
    Simple decorator to handle the creation and destruction of the database
    connection.
    """
    def replacement(self, *args, **kwargs):
        db = None
        try:
            db = connect(
                host=self.config.get('host', 'localhost'),
                user=self.config.get('user', 'tsesql'),
                password=self.config.get('password', ''),
                db=self.config.get('db', 'tsesql'),
                charset='utf8mb4',
                cursorclass=cursors.DictCursor
            )
            return method(self, db, *args, **kwargs)
        finally:
            if db is not None:
                db.close()

    replacement.__name__ = method.__name__
    return replacement


class TaximetroAPI(object):
    """
    Taximetro Python-Flask REST API example.
    """

    def __init__(self, ):

        # Read configuration
        with open(join(dirname(abspath(__file__)), 'settings.json')) as fd:
            self.config = loads(fd.read())

        # Configure Flask application
        self.app = Flask('taximetro', static_folder=None)
        self.app.errorhandler(404)(self.not_found)

        # Define routes
        routes = [
            (
                '/api/find_taxi/<string:plate>',
                self.find_taxi,
                'GET'
            ), (
                '/api/submit_review/<string:plate>',
                self.submit_review,
                'POST'
            )
        ]
        for endpoint, method, verb in routes:
            self.app.route(endpoint, methods=[verb])(method)

    @cross_origin()
    @injectdb
    def find_taxi(self, db, plate):

        # Find taxi
        with db.cursor(DictCursor) as cursor:
            cursor.execute(QUERY_FIND_TAXI, (plate, ))
            taxi = cursor.fetchone()

        if not taxi:
            return make_response(jsonify({'error': 'Taxi not found'}), 404)

        # Fetch related data
        with db.cursor(DictCursor) as cursor:
            cursor.execute(QUERY_GET_REVIEWS, (taxi['idtaxi'], ))
            reviews = cursor.fetchall()

        if reviews:
            taxi['stars'] = sum(r['rating'] for r in reviews) / len(reviews)
            taxi['reviews'] = reviews
        else:
            taxi['stars'] = 0
            taxi['reviews'] = []

        del taxi['idtaxi']
        return jsonify(taxi)

    @cross_origin()
    @injectdb
    def submit_review(self, db, plate):
        # Validate payload
        payload = request.get_json()

        if sorted(payload) != sorted(['rating', 'content', 'fbid', 'fbname']):
            return make_response(jsonify({'error': 'Invalid payload'}), 400)

        if not 0 <= payload['rating'] <= 5:
            return make_response(jsonify({'error': 'Invalid rating'}), 400)

        if not all(payload[field] for field in ['content', 'fbid', 'fbname']):
            return make_response(jsonify({'error': 'Missing content'}), 400)

        # Find taxi
        with db.cursor(DictCursor) as cursor:
            cursor.execute(QUERY_FIND_TAXI, (plate, ))
            taxi = cursor.fetchone()

        if not taxi:
            return make_response(jsonify({'error': 'Taxi not found'}), 404)

        # Insert into database
        with db.cursor(DictCursor) as cursor:
            cursor.execute(
                QUERY_SUBMIT_REVIEW,
                (
                    taxi['idtaxi'],
                    payload['rating'],
                    payload['content'],
                    0,
                    payload['fbid'],
                    payload['fbname']
                )
            )
        db.commit()

        return jsonify({'result': 'ok'})

    def not_found(self, error):
        return make_response(jsonify({'error': 'Not found'}), 404)

    def run(self):
        self.app.run(
            port=self.config.get('api_port', 5000),
            debug=self.config.get('debug', False),
        )


if __name__ == '__main__':
    app = TaximetroAPI()
    app.run()
