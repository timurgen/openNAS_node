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
				var resultString = stdout.toString();
				var resultArray = resultString.split(/(\r?\n)/g);
				for (var i = 0; i < resultArray.length; i++) {
					var line = resultArray[i].split('\t');
					var disk = {
							type: line[0],
							name: line[1],
							vid: line[2],
							pid: line[3],
							size: line[4],
							remv: line[5],
							ssd: line[6]
						}
						;

					disklist[i] = disk;
				}
				callback(disklist);
			}
		}
	)
	;
}
;
