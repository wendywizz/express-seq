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

db.User = require('./UserModel.js')(sequelize, Sequelize);
db.Company = require('./CompanyModel.js')(sequelize, Sequelize);
db.Job = require('./JobModel.js')(sequelize, Sequelize);
db.Region = require('./RegionModel')(sequelize, Sequelize);
db.Province = require('./ProvinceModel')(sequelize, Sequelize);
db.District = require('./DistrictModel')(sequelize, Sequelize);

module.exports = db;