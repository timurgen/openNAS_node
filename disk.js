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
			for(var i = 0; i < resultArray.length; i++) {
				var disk;
				var line = resultArray[i].split('\t');
				disk.type = line[0];
				disk.name = line[1];
				disk.vid = line[2];
				disk.pid = line[3];
				disk.size = line[4];
				disk.remv = line[5];
				disk.ssd = line[6];
				disklist[i] = disk;
			}
			callback(disklist);
		}
	});
};
