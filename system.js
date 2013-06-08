var zpool = require('./zpool.js');
var fs = require('fs');


/**
 *
 */
exports.isConfigured = function (callback) {
	zpool.poolList(function (poollist) {
		for (var i = 0; i < poollist.length; i++) {
			if (fs.existsSync('/' + poollist[i].name + '/.sytem_pool')) {
				callback(true);
				return;
			}
		}
		callback(false);
	});

};

exports.isSupported = function () {

};

exports.reboot = function () {
};

exports.shutdown = function () {
};
