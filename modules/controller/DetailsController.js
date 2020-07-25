var LOGGER = require(__BASE__ + "modules/utils/Logger");
var detailsOperations = require(__BASE__ + "modules/database/accessors/details_operations");
var Promise = require('bluebird');

var submitDetails = function (userId, parameters) {

    return detailsOperations.createDetail(userId, parameters)
        .then(function(response){
            return Promise.resolve(response);
        })
}

module.exports = {
    submitDetails: submitDetails

}