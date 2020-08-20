// eslint-disable-next-line import/no-dynamic-require,no-undef
const Details = require(`${__BASE__}modules/database/models/Details`);
const Promise = require("bluebird");
const result = require("../../../Rules/rules");

const getCreateTemplate = function(parameters) {
  const template = {};
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const key in parameters) {
    // eslint-disable-next-line default-case
    switch (key) {
      case "user":
      case "age":
      case "monthlyIncome":
      case "gender":
      case "isMarried":
      case "isSpouseWorking":
      case "ageSpouse":
      case "numberOfKids":
      case "kids":
      case "disabilityPresent":
      case "isHavingCar":
      case "isHavingCarInsurance":
      case "isHavingHealthInsurance":
      case "isHavingLifeInsurance":
      case "isHavingTermInsurance":
        template[key] = parameters[key];
        break;
    }
  }

  template.create_time = new Date();

  return template;
};

const getUpdateTemplate = function(parameters) {
  const template = {};
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const key in parameters) {
    // eslint-disable-next-line default-case
    switch (key) {
      case "age":
      case "monthlyIncome":
      case "isMarried":
      case "isSpouseWorking":
      case "ageSpouse":
      case "numberOfKids":
      case "kids":
      case "disabilityPresent":
      case "isHavingCar":
      case "isHavingCarInsurance":
      case "isHavingHealthInsurance":
      case "isHavingLifeInsurance":
      case "isHavingTermInsurance":
        template[key] = parameters[key];
        break;
    }
  }

  template.update_time = new Date();

  return template;
};

const generateReport = function(parameters) {
  return new Promise((resolve, reject) => {
    Details.findOne({ user: parameters.user }, (err, data) => {
      if (err) reject(err);
      if (data) {
        const resultArray = result.ruleEngine(data);
        resolve(resultArray);
      } else {
        resolve({ msg: "Failure" });
      }
    });
  });
};

const getDetail = function(user) {
  return new Promise((resolve, reject) => {
    Details.findOne({ user: user }, (err, data) => {
      if (err) reject(err);
      if (data) {
        resolve(data);
      } else {
        resolve({ msg: "Failure" });
      }
    });
  });
};

const createDetail = function(user, parameters) {
  return new Promise((resolve, reject) => {
    const template = getCreateTemplate(parameters);
    const details = new Details(template);
    details.save((err, data) => {
      if (!err) {
        resolve(data);
      } else {
        //   LOGGER.logErrorMessage('CreateDetails', err, template);
        reject(new Error("Failed to create Details for the user"));
      }
    });
  });
};

const updateDetail = function(user, parameters) {
  return new Promise((resolve, reject) => {
    const template = getUpdateTemplate(parameters);
    const details = new Details(template);
    details.findOneAndUpdate({ user }, template, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        //   LOGGER.logErrorMessage('CreateDetails', err, template);
        reject(new Error("Failed to create Details for the user"));
      }
    });
  });
};

module.exports = {
  getDetail,
  createDetail,
  updateDetail,
  generateReport
};
