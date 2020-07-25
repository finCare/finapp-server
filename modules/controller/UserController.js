var LOGGER = require(__BASE__ + "modules/utils/Logger");
var authenticateOperations = require(__BASE__ + "modules/database/accessors/authenticate_operations");
var Promise = require('bluebird');

var signupUser = function (email, parameters) {

    return authenticateOperations.checkIfUserExists(email)
        .then(function(response) {
            if(!(response.msg === "Failure")) {
                return Promise.resolve(response)
            }else{
                return authenticateOperations.signupUser(parameters)
                    .then(function(data){
                        if(data){
                            return Promise.resolve(data)
                        }
                    }).catch(function (err) {

                    })

            }
        }).catch(function(err){

        })
}


var loginUser = function (parameters) {

    return authenticateOperations.loginUser(parameters)
        .then(function(response) {
            if(response){
                return Promise.resolve(response)
            }
        }).catch(function(err){
                return Promise.resolve(err)
        })
}

module.exports = {
    signupUser: signupUser,
    loginUser: loginUser

}