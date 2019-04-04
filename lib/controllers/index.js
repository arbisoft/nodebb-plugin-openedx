'use strict';

var controllers = require.main.require('./src/controllers');

var embedControllers = require('./embed');
var adminControllers = require('./admin');

controllers.embed = embedControllers;
controllers.adminPanel = adminControllers;

module.exports = controllers;
