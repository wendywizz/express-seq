const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Job', {
    job_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    job_position: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    job_duty: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    job_performance: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    job_welfare: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    salary_type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    salary_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    salary_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    work_days: {
      type: DataTypes.BLOB,
      allowNull: true,
      defaultValue: {mon:0,tue:0,wed:0,thu:0,fri:0,sat:0,sun:0}
    },
    work_time_start: {
      type: DataTypes.STRING(5),
      allowNull: true,      
    },
    work_time_end: {
      type: DataTypes.STRING(5),
      allowNull: true,      
    },
    sub_area: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    country: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 66
    },
    require_amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    expire_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    company_owner: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Company',
        key: 'company_id',
        as: 'company_owner'
      }
    },
    created_by: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'User',
        key: 'user_id',
        as: 'created_by'
      }
    }
  }, {
    sequelize,
    tableName: 'job',
    modelName: 'Job',
    timestamps: false,
    indexes: [{ unique: true, fields: ['job_id', 'job_position'] }]
  })
}