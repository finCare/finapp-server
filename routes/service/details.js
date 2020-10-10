const express = require("express");

const router = express.Router();
const RESPONSE = require(`${__BASE__}modules/controller/handler/ResponseHandler`);
const DetailsController = require(`${__BASE__}modules/controller/DetailsController`);

router.post("/submitDetails", (req, res) => {
  //  var decoded = TokenHandler.getUserIdAndRoleFromRequest(req);
  const { user } = req.body;
  const { age } = req.body;
  const { monthlyIncome } = req.body;
  const { gender } = req.body;

  const { isMarried } = req.body;

  const { isSpouseWorking } = req.body;
  const { ageSpouse } = req.body;

  const { numberOfKids } = req.body;
  const { kids } = req.body;
  const { disabilityPresent } = req.body;

  const { isHavingCar } = req.body;
  const { isHavingCarInsurance } = req.body;

  const { isHavingHealthInsurance } = req.body;
  const { isHavingLifeInsurance } = req.body;
  const { isHavingTermInsurance } = req.body;

  const { isHavingBond } = req.body;
  const { isHavingCarLoan } = req.body;
  const { isHavingEPF } = req.body;
  const { isHavingGeneralInsurance } = req.body;
  const { isHavingHomeLoan } = req.body;
  const { isHavingMutualFund } = req.body;
  const { isHavingNPS } = req.body;
  const { isHavingPPF } = req.body;
  const { isHavingStock } = req.body;
  const { amountCashDeposit } = req.body;
  const { amountFixedDeposit } = req.body;
  const { amountPPF } = req.body;

  const parameters = {};

  if (user !== undefined) {
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

    parameters.isHavingBond = isHavingBond;
    parameters.isHavingCarLoan = isHavingCarLoan;
    parameters.isHavingEPF = isHavingEPF;
    parameters.isHavingGeneralInsurance = isHavingGeneralInsurance;
    parameters.isHavingHomeLoan = isHavingHomeLoan;
    parameters.isHavingMutualFund = isHavingMutualFund;
    parameters.isHavingNPS = isHavingNPS;
    parameters.isHavingPPF = isHavingPPF;
    parameters.isHavingStock = isHavingStock;
    parameters.amountCashDeposit = amountCashDeposit;
    parameters.amountFixedDeposit = amountFixedDeposit;
    parameters.amountPPF = amountPPF;
  }

  DetailsController.submitDetails(user, parameters)
    .then(response => {
      DetailsController.generateReport(response).then(data => {
        console.log("response", data);
        RESPONSE.sendOkay(res, { status: "Success", data });
      });
    })
    .catch(err => {
      RESPONSE.sendError(res, { status: "Failure", data: err });
    });
});

router.post("/getDetails", (req, res) => {
  const { user } = req.body;
  if (user === undefined) {
    RESPONSE.sendError(res, { status: "Failure", data: "User not sent" });
  }

  console.log("user", user);
  DetailsController.getDetails(user)
    .then(response => {
      RESPONSE.sendOkay(res, { status: "Success", data: response });
    })
    .catch(err => {
      RESPONSE.sendError(res, { status: "Failure", data: err });
    });
});

module.exports = router;
