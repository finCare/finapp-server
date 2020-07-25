"use strict";

var ExtendableError = require(__BASE__ + "modules/Error/ExtendableError");

class OperationalError extends ExtendableError {
    constructor (message) {
        super(message);
    }
}

module.exports = OperationalError;
