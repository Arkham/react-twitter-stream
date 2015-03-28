var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || "development";
var config    = require('./config/config.json')[env];

module.exports = new Sequelize(config.database, config.username, config.password, config);
