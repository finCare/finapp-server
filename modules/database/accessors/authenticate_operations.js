var User = require(__BASE__ + "modules/database/models/User");
var LOGGER = require(__BASE__ + "modules/utils/Logger");
var extend = require('util')._extend;
var Promise = require('bluebird');

var getCreateTemplate = function (parameters) {

    var template = {};
    for (var key in parameters) {
        switch (key) {
            case 'email':
            case 'password':
            case 'firstname':
            case 'lastname':
                template[key] = parameters[key];
                break;
        }
    }

    template.create_time = new Date();

    return template;
}

let signupUser = function (parameters) {
    return new Promise(function (resolve, reject) {
        let template = getCreateTemplate(parameters);
        console.log(template)
        let record = new User(template);
        record.save(function (err, data) {
            if (!err) {
                resolve(data)
            } else {
                //   LOGGER.logErrorMessage('CreateDetails', err, template);
                console.log(err)
                reject(new Error('Failed to signup the user'));
            }
        });
    });
};


let loginUser = function (parameters) {
    return new Promise(function (resolve, reject) {
        User.find(parameters, (err, existingUser) => {
            if (err) { reject(err); }
            if (existingUser){
                resolve(existingUser)
            }else{
                resolve({msg: 'Failure'})
            }
        });
    });
};


let checkIfUserExists = function (email){
    return new Promise(function (resolve, reject) {
        User.findOne({ email: email}, (err, existingUser) => {
            if (err) { reject(err); }
            if (existingUser){
                resolve({msg: 'User Already exist with the given email'})
            }else{
                resolve({msg: 'Failure'})
            }
        });
    })
}



module.exports = {
    signupUser: signupUser,
    checkIfUserExists:checkIfUserExists,
    loginUser:loginUser

}

