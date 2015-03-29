"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable(
      'Tweets',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        tweetId: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
        author: DataTypes.STRING,
        avatar: DataTypes.STRING,
        body: DataTypes.STRING,
        date: DataTypes.DATE,
        screenName: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
      }
    )
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('tweets');
    done();
  }
};
