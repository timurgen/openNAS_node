var exec = require('child_process').exec;
var log4js = require('log4js');
var logger = log4js.getLogger();

/**
 * enables multicast service (SMF)
 */
exports.multicastEnable = function () {
	exec('svcadm enable multicast', function (error, stdout, stderr) {
		if (error != null) {
			logger.error(error.message);
		}
	});
};
/**
 * disables multicast service (SMF)
 */
exports.multicastDisable = function () {
	exec('svcadm disable multicast', function (error, stdout, stderr) {
		if (error != null) {
			logger.error(error.message);
		}
	});
};
/**
 *
 * @param serviceName
 * @param serviceType
 * @param domain
 * @param port
 * @param text
 */
exports.multicastStartService = function (serviceName, serviceType, domain, port, text) {
	exec('dns-sd -R ' + serviceName + ' ' + serviceType + ' ' + domain + ' ' + port, function (error, stdout, stderr) {
		if (error != null) {
			logger.error(error.message);
		}
		else {
			logger.info('stdout:'+ stdout);
		}
	});
};


