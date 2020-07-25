var fs = require('fs');
var LOGGER = require(__BASE__ + "/utils/Logger");
var Busboy = require('busboy');
var path = require('path');
var responseHandler = require(__BASE__ + "/controller/handler/ResponseHandler");

/*
 modify the on finish and on error functions based on requirements..
 */
exports.streamFileToDisk = function (req, res) {
    
    LOGGER.log.debug(JSON.stringify(req.headers));
    var busboy = new Busboy({headers: req.headers});
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        var saveTo = path.join('.', filename);
        LOGGER.log.debug('Uploading: ' + saveTo);
        file.pipe(fs.createWriteStream(saveTo));
    });
    
    // finish is fired in both cases where upload is either success or failure.. it just says fileupload is complete
    busboy.on('finish', function () {
        responseHandler.sendOkay(res, {status: 0, message: "upload Finished"})
    });
    
    busboy.on("error", function () {
        LOGGER.log.error("failed to upload the file" + saveTo);
        responseHandler.sendError(res, {status: 1, message: "upload Failed"})
    });
    
    return req.pipe(busboy);
};
