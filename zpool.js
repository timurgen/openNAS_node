var _ = require('underscore');
var cp = require('child_process');
var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var util = require('util');
var log4js = require('log4js');
var logger = log4js.getLogger();
if (!fs.existsSync) {
	fs.existsSync = path.existsSync;
}
/**
 *
 */
exports.poolList = function() {};
/**
 *
 * @param name
 * @param disks
 */
exports.poolCreate = function(name, disks) {};
/**
 *
 * @param poolName
 * @param forseDestroy
 */
exports.poolDestroy = function(poolName, forseDestroy){};
/**
 *
 * @param poolName
 */
exports.poolStatus = function(poolName) {};

