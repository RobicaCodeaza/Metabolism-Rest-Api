const dbConfig = require('../config/dbConfig');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  // operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to database...');
  })
  .catch((err) => {
    console.log(`Error ${err}`);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.persons = require('./personDetailsModel.js')(sequelize, DataTypes);

// Does not create a new database
db.sequelize
  .sync({
    alter: true,
  })
  .then(() => console.log('Yes re-sync done!'));

module.exports = db;
