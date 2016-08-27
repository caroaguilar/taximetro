var baseUrl = 'http://localhost:5000';

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
    }
};
