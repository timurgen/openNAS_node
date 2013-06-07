/**
 * Module dependencies.
 */

var express = require('express')
	, routes = require('./routes')
	, http = require('http')
	, path = require('path')
	, mdns = require('./mdns.js');


var log4js = require('log4js');
log4js.configure({
	appenders: [
		{ type: 'console' }
	]
});
var logger = log4js.getLogger();
var system = require('./system.js');

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
/**
 * routs here
 */
app.get('/', routes.index);
app.get('/login', routes.login);
app.get('/logoff', routes.logoff);
app.post('/auth', routes.auth);
//end of routs

//start server
logger.info('starting openNAS server');
http.createServer(app).listen(app.get('port'), function () {
	logger.info('openNAS server started on port ' + app.get('port'));
//start mdns
	mdns.multicastEnable();
	mdns.multicastStartService(system.isConfigured()?'openNAS':'openNAS_unconfigured', '_http._tcp', 'local', app.get('port'));
});

//test
var zpool = require('./zpool.js');
zpool.poolList(function(poollist){

});