var ERROR_WEBHOOK = 'https://hooks.slack.com/services/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';
var CONTACT_US_WEBHOOK = 'https://hooks.slack.com/services/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';
var PRODUCTION_ISSUES_WEBHOOK = "https://hooks.slack.com/services/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";
var ONLINE_PAYMENT_WEBHOOK = "https://hooks.slack.com/services/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";
var PAYMENT_REQUEST_HOOK= "https://hooks.slack.com/services/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";

var CONFIG = require(__BASE__ + "config/global");
var slackConfig = require(__BASE__ + "config/slackConfig");

var errorSlack = require('slack-notify')(ERROR_WEBHOOK);
var contactUsSlack = require('slack-notify')(CONTACT_US_WEBHOOK);
var productionIssueSlack = require('slack-notify')(PRODUCTION_ISSUES_WEBHOOK);
var onlinePaymentSlack = require('slack-notify')(ONLINE_PAYMENT_WEBHOOK);
var paymentRequestHook = require('slack-notify')(PAYMENT_REQUEST_HOOK);

var sendErrorToSlack = function (channel, message) {
    if (CONFIG.isEnvironmentProduction() || CONFIG.isEnvironmentDevelopment()) {
        errorSlack.send({
            channel: channel.name,
            text: "[" + CONFIG.getEnvironment() + "] " + message,
            username: channel.userName
        });
    }
};

var sendContactUsToSlack = function (text) {
    contactUsSlack.send({
        channel: slackConfig.CONTACT_US.name,
        username: slackConfig.CONTACT_US.username,
        text: text
    });
};

var notifyProductionIssue = function (message) {
    productionIssueSlack.send({
        text: message,
        username: slackConfig.PRODUCTION_ISSUES.username
    });
};

var notifyNewOnlinePayment = function(message) {
  onlinePaymentSlack.send({
      text: "[" + CONFIG.getEnvironment() + "] " + message,
      username: slackConfig.ONLINE_PAYMENTS.username
  });
}

var notifyNewPaymentRequest = function(message) {
    paymentRequestHook.send({
        text: "[" + CONFIG.getEnvironment() + "] " + message,
        username: slackConfig.ONLINE_PAYMENTS.username
    });
}

var notifyOrgSignupRequest = function(message) {
    contactUsSlack.send({
        channel: slackConfig.CONTACT_US.name,
        username: slackConfig.CONTACT_US.username,
        text: ' ' + message.firstname + '  ' + message.lastname + ' ' + message.phone + '  ' + message.email + ' ' + message.password
    });
}

// contact us webhook : https://hooks.slack.com/services/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
module.exports = {
    sendErrorToSlack: sendErrorToSlack,
    sendContactUsToSlack: sendContactUsToSlack,
    notifyProductionIssue: notifyProductionIssue,
    notifyNewOnlinePayment: notifyNewOnlinePayment,
    notifyNewPaymentRequest : notifyNewPaymentRequest,
    notifyOrgSignupRequest : notifyOrgSignupRequest
};
