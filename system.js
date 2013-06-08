var zpool = require('./zpool.js');
var fs = require('fs');


/**
 *
 */
exports.isConfigured = function (callback) {
	zpool.poolList(function (poollist) {
		var exist = false;
		for (var i = 0; i < poollist.length; i++) {
			exist = exist | fs.existsSync('/' + poollist[i].name + '/.system_pool');
		}
		callback(exist);
	});
};

exports.isSupported = function () {

};

exports.reboot = function () {
};

exports.shutdown = function () {
};
