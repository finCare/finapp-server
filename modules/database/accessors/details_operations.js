const Details = require(`${__BASE__}modules/database/models/Details`);
const Promise = require("bluebird");

const getCreateTemplate = function(parameters) {
  const template = {};
  for (const key in parameters) {
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
  for (const key in parameters) {
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
  createDetail,
  updateDetail
};
