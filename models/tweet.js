var Sequelize = require('sequelize');
var sequelize = require('../sequelize');

module.exports = Tweet = sequelize.define('Tweet', {
  twid: Sequelize.STRING,
  active: Sequelize.BOOLEAN,
  author: Sequelize.STRING,
  avatar: Sequelize.STRING,
  body: Sequelize.STRING,
  date: Sequelize.DATE,
  screenname: Sequelize.STRING
});
