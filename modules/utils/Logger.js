// var path = require('path');
// var logger_prefixes = require(__BASE__ + "config/LoggerPrefixes");
// var slackNotifier = require(__BASE__ + 'modules/utils/slackNotifier.js');
// var slackEnum = require(__BASE__ + 'config/slackConfig.js');
//
//
// var OperationalError = require(__BASE__ + 'modules/Error/OperationalError');
//
// var customLogLevels = {
//     levels: {
//         error: 4,
//         warn: 3,
//         debug: 2,
//         info: 1,
//         access: 0
//     },
//     colors: {
//         error: 'red',
//         warn: 'orange',
//         debug: 'white',
//         info: 'blue',
//         access: 'green'
//     }
// };
//
// if (!fs.existsSync(logDir)) {
//     // Create the directory if it does not exist
//     fs.mkdirSync(logDir);
// }
//
// var loggerTransports = [];
//
// if (env === "production") {
//     loggerTransports = [
//         new winston.transports.File({
//             level: 'warn',
//             filename: path.join(logDir, infoLog),
//             maxsize: 1024 * 1024 * 10, // 10MB
//             timestamp: true
//         })
//     ];
// } else {
//     loggerTransports = [
//         new winston.transports.Console({
//             level: 'debug', // Only write logs of warn level or higher
//             colorize: true
//         }),
//         new winston.transports.File({
//             level: 'info',
//             filename: path.join(logDir, infoLog),
//             maxsize: 1024 * 1024 * 10, // 10MB
//             timestamp: true
//         })
//     ];
// }
//
// var exceptionHandlers = [new winston.transports.File({
//     filename: path.join(logDir, exceptionLog),
//     timestamp: true
// })];
//
// if (env != "production") {
//     exceptionHandlers.push(new (winston.transports.Console)({
//         json: false,
//         timestamp: true
//     }));
// }
//
// var logger = {
//     log: new winston.Logger({
//         levels: customLogLevels.levels,
//         transports: loggerTransports,
//         exceptionHandlers: exceptionHandlers,
//     }),
//     PREFIX: logger_prefixes
// };
//
//
// logger.logErrorMessage = function () {
//     var params = "";
//     for (var i = 2; i < arguments.length - 1; i++) {
//         params += JSON.stringify(arguments[i]) + ", ";
//     }
//     params += JSON.stringify(arguments[i]);
//
//     var functionName = arguments[0];
//     var error = arguments[1];
//
//     // put operational errors in debug..
//     var message = "[" + functionName + "] REQUEST: (" + params + ") ERROR: " + error.message;
//
//     if (error instanceof OperationalError) {
//         logger.log.debug(message);
//     } else {
//         logger.log.error(message);
//         slackNotifier.sendErrorToSlack(slackEnum.ERROR, message + " " + error.trace);
//     }
//
// };
//
// logger.stackTrace = function () {
//     var params = "";
//     for (var i = 2; i < arguments.length - 1; i++) {
//         params += JSON.stringify(arguments[i]) + ", ";
//     }
//     params += JSON.stringify(arguments[i]);
//
//     var functionName = arguments[0];
//     var error = arguments[1];
//     var message = "[" + functionName + "] REQUEST: (" + params + ") ERROR: " + error.message + ", stackTrace: " + error.stack;
//     logger.log.error(message);
//     slackNotifier.sendErrorToSlack(slackEnum.ERROR, message);
//
// };
//
//
// module.exports = logger;
