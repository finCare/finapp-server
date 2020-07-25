// contains all the request manipulations before using it
var logger = require(__BASE__ + 'modules/utils/Logger');

exports.getDecodedBody = function (request) {
    var result = {};
    for (var param in request.body) {
        result[param] = decodeURIComponent(request.body[param]);
    }
    logger.log.info(JSON.stringify(result));
    return result;
};

exports.getBodyParameter = function (request, parameter) {
    logger.log.info(JSON.stringify(request.body));
    if (request.body[parameter])
        return decodeURIComponent(request.body[parameter]);
    else
        return null;
};
