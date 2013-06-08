var disk = require('../disk.js');

exports.index = function (req, res) {
	var pjson = require('../package.json');
	res.render('initialconf', {
		title: pjson.name + " v." + pjson.version,
		appversion: pjson.version
	});
}

exports.getdisks = function (req, res) {
	disk.diskinfo(function (disklist) {
		res.send(disklist);
	});
}