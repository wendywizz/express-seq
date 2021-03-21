module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Job", {
    job_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    job_position: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    job_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Jobtype',
        key: 'job_type_id',
        as: 'job_type'
      }
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
      allowNull: true,
      references: {
        model: 'SalaryType',
        key: 'salary_type_id',
        as: 'salary_type'
      }
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
    district: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'District',
        key: 'id',
        as: 'district'
      }
    },
    province: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Province',
        key: 'id',
        as: 'province'
      }
    },
    region: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Region',
        key: 'id',
        as: 'region'
      }
    },
    require: {
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
    indexes: [{ unique: true, fields: ['job_id','job_position'] }]
  })
}