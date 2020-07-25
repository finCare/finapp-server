"use strict";

var OperationalError = require(__BASE__ + "modules/Error/OperationalError");

class ShowableError extends OperationalError {
    constructor (message) {
        super(message);
    }
}

module.exports = ShowableError;
