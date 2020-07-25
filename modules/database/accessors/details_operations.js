var Details = require(__BASE__ + "modules/database/models/Details");
var mongoose = require('mongoose');
var LOGGER = require(__BASE__ + "modules/utils/Logger");
var extend = require('util')._extend;
var Promise = require('bluebird');

var getCreateTemplate = function (parameters) {

    var template = {};
    for (var key in parameters) {
        switch (key) {
            case 'user':
            case 'age':
            case 'monthlyIncome':
            case 'gender':
            case 'isMarried':
            case 'isSpouseWorking':
            case 'ageSpouse':
            case 'numberOfKids':
            case 'kids':
            case 'disabilityPresent':
            case 'isHavingCar':
            case 'isHavingCarInsurance':
            case 'isHavingHealthInsurance':
            case 'isHavingLifeInsurance':
            case 'isHavingTermInsurance':
                template[key] = parameters[key];
                break;
        }
    }

    template.create_time = new Date();

    return template;
}

let createDetail = function (user, parameters) {
    return new Promise(function (resolve, reject) {
        let template = getCreateTemplate(parameters);
        let details = new Details(template);
        details.save(function (err, data) {
            if (!err) {
                resolve(data)
            } else {
                //   LOGGER.logErrorMessage('CreateDetails', err, template);
                reject(new Error('Failed to create Details for the user'));
            }
        });
    });
};


module.exports = {
    createDetail: createDetail
}

