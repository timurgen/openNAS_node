/**
 * Module dependencies.
 */

var express = require('express')
	, routes = require('./routes')
	, http = require('http')
	, path = require('path')
	, mdns = require('mdns');


var log4js = require('log4js');
log4js.configure({
	appenders: [
		{ type: 'console' }
	]
});
var logger = log4js.getLogger();
var system = require('./system.js');
var routeConfig = require('./routes/config.js');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: 'supermegasecrethkjhkghgjhjhgjnkiu6yurtfhgjbh'}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {

	app.use(express.errorHandler());
}



setTimeout(system.isConfigured(function (isConfigured) {
	var serviceName = isConfigured ? 'openNAS' : 'openNAS_unconfigured';
	var service = ad = mdns.createAdvertisement(mdns.tcp('http'), 3000, {name: serviceName}, function (error, service) {
		if (error == null) {
			logger.info('service: ' + serviceName + ' created');
		}
		else {
			logger.error(error.toString());
		}

	});
	service.start();
	if (!isConfigured) {//this routs for app configuration
		logger.info('System seems to be unconfigured, changing route of index page');
		app.get('/', routeConfig.index);
		app.get('/getdisks', routeConfig.getdisks);
		app.get('/getregistrationform', routeConfig.getRegistrationForm);
		app.post('/createstorage', routeConfig.createStorage);
	} else {//here is main routs
		app.get('/', routes.index);
		app.get('/login', routes.login);
		app.get('/logoff', routes.logoff);
		app.post('/auth', routes.auth);
		app.get('/getsysinfo', routes.getSysinfo);
		app.get('/getpoolinfo', routes.getPoolInfo);
//end of routs
	}
	//start server
	logger.info('starting openNAS server');
	http.createServer(app).listen(app.get('port'), function () {
		logger.info('openNAS server started on port ' + app.get('port'));
	});
}), 1000);





