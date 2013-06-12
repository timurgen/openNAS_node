var zpool = require('./zpool.js');
var fs = require('fs');


/**
 *
 */
exports.isConfigured = function () {
	return fs.existsSync('/usbkey/config');
};

exports.isSupported = function () {

};

exports.reboot = function () {
};

exports.shutdown = function () {
};
