const { localDB, ployloraDB } = require('../../config/database.js')
const envMode = process.env.NODE_ENV

const localConn = (envMode === "production" ? localDB.production : localDB.development);
const ployloraConn = (envMode === "production" ? ployloraDB.production : ployloraDB.development);

// Setting Local database connection instance
const Sequelize = require('sequelize');
const local = new Sequelize(localConn.database, localConn.username, localConn.password, {
  host: localConn.host,
  dialect: localConn.dialect,
  port: localConn.port,
  pool: localConn.pool
})

// Setting ploylora database connection instance
const ploylora = new Sequelize(ployloraConn.database, ployloraConn.username, ployloraConn.password, {
  host: ployloraConn.host,
  dialect: ployloraConn.dialect,  
  port: ployloraConn.port,
  pool: ployloraConn.pool
})

const orm = {};
orm.Sequelize = Sequelize

// Local
orm.local = local;
orm.Region = require('./RegionModel')(local, Sequelize)
orm.Province = require('./ProvinceModel')(local, Sequelize)
orm.District = require('./DistrictModel')(local, Sequelize)
orm.User = require('./UserModel.js')(local, Sequelize)
orm.Company = require('./CompanyModel')(local, Sequelize)
orm.JobType = require('./JobTypeModel')(local, Sequelize)
orm.SalaryType = require('./SalaryTypeModel')(local, Sequelize)

/* Job Model */
orm.Job = require('./JobModel')(local, Sequelize)
orm.Job.belongsTo(orm.JobType, { 
  as: "job_type_asso", 
  foreignKey: "job_type" 
})
orm.Job.belongsTo(orm.SalaryType, {
  as: "salary_type_asso",
  foreignKey: "salary_type"
})
orm.Job.belongsTo(orm.User, {
  as: "created_by_asso",
  foreignKey: "created_by"
})
orm.Job.belongsTo(orm.Company, {
  as: "company_owner_asso",
  foreignKey: "company_owner"
})
orm.Job.belongsTo(orm.Province, {
  as: "province_asso",
  foreignKey: "province"
})
orm.Job.belongsTo(orm.District, {
  as: "district_asso",
  foreignKey: "district"
})
orm.Job.belongsTo(orm.Region, {
  as: "region_asso",
  foreignKey: "region"
})

// Ploylora
orm.ploylora = ploylora
orm.RStudent = require('./RStudentModel.js')(ploylora, Sequelize)

module.exports = orm;