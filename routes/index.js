var system = require('../system.js');
var os = require('os');
var pjson = require('../package.json');
var moment = require('moment');

/*
 * GET home page.
 */
exports.index = function (req, res) {
	var pjson = require('../package.json');
	if (req.session.isLogged) {
		res.render('index', {
			title: pjson.name + " v." + pjson.version,
			hostname: os.hostname(),
			type: os.type(),
			platform: os.platform(),
			cpuarch: os.arch(),
			release: os.release(),
			uptime: moment.format(os.uptime()),
			ram: Math.round((os.totalmem() / 1024.0 / 1024.0 / 1024.0)*100)/100 + ' GB'
		});
	}
	else {
		res.redirect('/login');
	}

};
/*
 *GET /login page  with login form
 */
exports.login = function (req, res) {

	res.render('login', { title: pjson.name + " v." + pjson.version });
};
/*
 * POST auth
 * auth servlet
 */
exports.auth = function (req, res) {
	var name = req.body.user.name;
	var pass = req.body.user.passwd;
	//TODO login ? db ?
	req.session.isLogged = true;
	res.redirect('/');
}

/**
 * <p>Log off servlet
 * @param req
 * @param res
 */
exports.logoff = function (req, res) {
	req.session.destroy();
	res.redirect('/login');
}

//partial views
exports.storage = function (req, res) {

}

exports.getSysinfo = function (req, res) {
	res.render('sysinfo', {
		hostname: os.hostname,
		type: os.type,
		platform: os.platform,
		cpuarch: os.arch,
		release: os.release,
		uptime: os.uptime,
		ram: os.totalmem / 1024.0 / 1024.0 / 1024.0 + 'GB'
	});
}
