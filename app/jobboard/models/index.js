const dbConfig = require('../configs/db.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,  
  port: dbConfig.port,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Company = require('./CompanyModel.js')(sequelize, Sequelize);
db.Job = require('./JobModel.js')(sequelize, Sequelize);
db.User = require('./ UserModel.js')(sequelize, Sequelize);

module.exports = db;