/*
 * GET home page.
 */
exports.index = function (req, res) {
	var pjson = require('../package.json');
	if (req.session.isLogged) {
		res.render('index', { title: pjson.name + " v." + pjson.version });
		mdns = require('../mdns.js');
		mdns.multicastStartService('openNAS','_http._tcp', 'local',3000, null);
	}
	else {
		res.redirect('/login');
	}

};
/*
 *GET /login page  with login form
 */
exports.login = function (req, res) {
	var pjson = require('../package.json');
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
