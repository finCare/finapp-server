// eslint-disable-next-line no-undef,import/no-dynamic-require
const detailsOperations = require(`${__BASE__}modules/database/accessors/details_operations`);
const Promise = require("bluebird");

const submitDetails = function(userId, parameters) {
  return detailsOperations
    .createDetail(userId, parameters)
    .then(response => Promise.resolve(response))
    .catch(err => Promise.resolve(err));
};

const updateDetails = function(userId, parameters) {
  return detailsOperations
    .updateDetail(userId, parameters)
    .then(response => {
      Promise.resolve(response);
    })
    .catch(err => Promise.resolve(err));
};

module.exports = {
  submitDetails,
  updateDetails
};
