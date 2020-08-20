// eslint-disable-next-line import/no-dynamic-require,no-undef
const LOGGER = require(`${__BASE__}modules/utils/Logger`);
// eslint-disable-next-line no-undef,import/no-dynamic-require
const detailsOperations = require(`${__BASE__}modules/database/accessors/details_operations`);
const Promise = require("bluebird");

const submitDetails = function(userId, parameters) {
  return detailsOperations
    .createDetail(userId, parameters)
    .then(response => Promise.resolve(response))
    .catch(err => Promise.resolve(err));
};

const getDetails = function(user) {
  return detailsOperations
    .getDetail(user)
    .then(response => Promise.resolve(response))
    .catch(err => Promise.resolve(err));
};

const generateReport = function(parameters) {
  return detailsOperations
    .generateReport(parameters)
    .then(response => Promise.resolve(response))
    .catch(err => Promise.resolve(err));
};

module.exports = {
  submitDetails,
  getDetails,
  generateReport
};
