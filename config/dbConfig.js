module.exports = {
  HOST: '127.0.0.1',
  USER: 'root',
  PASSWORD: 'rootPass',
  DB: 'persondetails_sequelize_api_db',
  dialect: 'mysql',

  // Documentation
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
