var exec = require('child_process').exec;
var log4js = require('log4js');
var logger = log4js.getLogger();

logger.setLevel('INFO');
/**
 *
 */
exports.poolList = function (callback) {
	"use strict";
	exec('zpool list -H -p', function (error, stdout, stderr) {
		var poolList;
		if (error != null) {
			logger.log(error.message);
		} else {
			var resultString = stdout.toString();
			var resultArray = resultString.split(/\r\n|\r|\n/g);
			poolList = [];
			for (var i = 0; i < resultArray.length; i++) {
				var line = resultArray[i].split('\t');
				if (line[0] === '') {//FIXME last line contains only " " donno why
					break;
				}
				var pool = {
					name: line[0],//string name
					size: line[1],//total size bytes
					alloc: line[2],//allocated bytes
					free: line[3], //free bytes
					cap: line[5],  //allocated place in percent
					health: line[7]//String status
				};
				poolList[i] = pool;
				logger.trace(pool);
			}
			callback(poolList);
		}
	});
};


/**
 *
 * @param name
 * @param disks
 */
exports.poolCreate = function (name, disks) {
};
/**
 *
 * @param poolName
 * @param forseDestroy
 */
exports.poolDestroy = function (poolName, forseDestroy) {
};
/**
 *
 * @param poolName
 */
exports.poolStatus = function (poolName, callback) {
	"use strict";

};

exports.poolInfo = function (poolName, callback) {
	"use strict"
};

