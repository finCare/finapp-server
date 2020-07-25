var express = require('express');
var router = express.Router();
var RESPONSE = require(__BASE__ + "modules/controller/handler/ResponseHandler");
var DetailsController = require(__BASE__ + "modules/controller/DetailsController");

router.post('/submitDetails', function (req, res) {
  //  var decoded = TokenHandler.getUserIdAndRoleFromRequest(req);
    var user = req.body.user;
    var age = req.body.age;
    var monthlyIncome = req.body.monthlyIncome;
    var gender = req.body.gender;

    var isMarried = req.body.isMarried;

    var isSpouseWorking = req.body.isSpouseWorking;
    var ageSpouse = req.body.ageSpouse;

    var numberOfKids = req.body.numberOfKids;
    var kids = req.body.kids;
    var disabilityPresent = req.body.disabilityPresent;

    var isHavingCar = req.body.isHavingCar;
    var isHavingCarInsurance = req.body.isHavingCarInsurance;

    var isHavingHealthInsurance = req.body.isHavingHealthInsurance;
    var isHavingLifeInsurance = req.body.isHavingLifeInsurance;
    var isHavingTermInsurance = req.body.isHavingTermInsurance;


    var parameters = {};

    if(user!==undefined){
        parameters.user = user;
        parameters.age = age;
        parameters.monthlyIncome = monthlyIncome;
        parameters.gender = gender;

        parameters.isMarried = isMarried;

        parameters.isSpouseWorking = isSpouseWorking;
        parameters.ageSpouse = ageSpouse;

        parameters.numberOfKids = numberOfKids;
        parameters.kids = kids;

        parameters.disabilityPresent = disabilityPresent;
        parameters.isHavingCar = isHavingCar;
        parameters.isHavingCarInsurance = isHavingCarInsurance;

        parameters.isHavingHealthInsurance = isHavingHealthInsurance;
        parameters.isHavingLifeInsurance = isHavingLifeInsurance;
        parameters.isHavingTermInsurance = isHavingTermInsurance;
    }

        DetailsController.submitDetails(user, parameters)
            .then(function (response) {
                RESPONSE.sendOkay(res,{status:'Success', data: response});
            }).catch(function(err){
                RESPONSE.sendOkay(res, {status: 'Failure', data: err})
        })
});

module.exports = router;