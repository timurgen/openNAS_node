var zpool = require('./zpool.js');
var fs = require('fs');

exports.isConfigured = function () {
	var out;
	zpool.poolList(function (poollist) {
		for (var i = 0; i < poollist.length; i++) {
			fs.existsSync('/' + poollist[i].name + '/.sytem_pool', function (exists) {
				if (exists) {
					out = true;
					return;
				}
			});
		}
		out = false;
	});
	return out;
};

exports.isSupported = function () {

};

exports.reboot = function () {
};

exports.shutdown = function () {
};
