var exec = require('child_process').exec;
var log4js = require('log4js');
var logger = log4js.getLogger();


exports.diskinfo = function (callback) {
	var disklist = new Array();
	exec('diskinfo -H -p', function (error, stdout, stderr) {
		if (error != null) {
			logger.error(error.message);
		}
		else {
			callback(stdout);
			//TODO read output and return it in parseable form, as JSON?
			logger.info(stdout);
		}
	});
};
