var baseUrl = 'http://taximetro.co.cr:5000';

module.exports = {
    findTaxi: function(plate, callback) {
        fetch(`${baseUrl}/api/find_taxi/${plate}`)
            .then(function(response) {
                return response.json()
            }).then(function(json) {
                callback(json);
            }).catch(function(ex) {
                callback({});
            });
    },

    submitReview: function(params, callback) {
        fetch(`${baseUrl}/api/submit_review/${params.plate}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params.review)
        }).then(function(response) {
            return response.json()
        }).then(function(json) {
            callback(null, json);
        }).catch(function(ex) {
            callback(ex);
        });
    },

    addLike: function(params, callback) {
        fetch(`${baseUrl}/api/like_review/${params.idReview}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(function(response) {
            return response.json()
        }).then(function(json) {
            callback(null, json);
        }).catch(function(ex) {
            callback(ex);
        });
    }
};
