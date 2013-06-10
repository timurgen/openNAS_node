var disk = require('../disk.js');
var execFile = require('child_process').execFile;
/**
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
	var pjson = require('../package.json');
	res.render('initialconf', {
		title: pjson.name + " v." + pjson.version,
		appversion: pjson.version
	});
};
/**
 *
 * @param req
 * @param res
 */
exports.getdisks = function (req, res) {
	disk.diskinfo(function (disklist) {
		res.send(disklist);
	});
};
/**
 *
 * @param rec
 * @param res
 */
exports.createStorage = function (req, res) {
	hdds = req.body.hdds;
	if(Object.prototype.toString.call(hdds) !== '[object Array]') {
		res.send({
			type: 'error',
			message:'diskarray looks bad'
		});
	}
	var arg1 = "\"";
	for(var i = 0; i < hdds.length; i++) {
		arg1 += hds[i] + " ";
	}
	arg1 += "\"";
	adminName = req.body.adminName;
	password = req.body.password;
	//TODO sanitize input
	//TODO check if chosen disks contain only available disks
	//TODO need to create DB and save admin name and password
	args = [arg1, password];
	execFile('/openNAS/myconf.sh', args, null, function(error, stdout, stderr){
		if(error != null) {
			res.send(JSON.stringify(error) + ": " + JSON.stringify(stderr.toString()));
		} else {
			res.send(JSON.stringify(stdout.toString()));
		}
	});
	res.send(JSON.stringify(req.body));
}
/**
 * <p> return rendered registration form
 * @param req http request
 * @param res http response
 */
exports.getRegistrationForm = function (req, res) {
	res.render('loginform');
}