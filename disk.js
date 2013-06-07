var exec = require('child_process').exec;
var log4js = require('log4js');
var logger = log4js.getLogger();


exports.diskinfo = function () {
	var disklist = new Array();
	exec('disklayout -H -p', function (error, stdout, stderr) {
		if (error != null) {
			logger.error(error.message);
		}
		else {
			//TODO read output and return it in parseable form, as JSON?
			logger.info(stdout);
		}
	});
};
