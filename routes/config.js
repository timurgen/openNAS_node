var disk = require('../disk.js');
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

	res.send(JSON.stringify(req.body));
}
/**
 *
 * @param req
 * @param res
 */
exports.getRegistrationForm = function (req, res) {
	res.render('loginform');
}