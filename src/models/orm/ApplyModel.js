const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Apply', {
    apply_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false      
    },
    apply_greeting: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    apply_status: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: 0
    },
    job_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Job',
        key: 'job_id'
      }
    },
    resume_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Resume',
        key: 'id'
      }
    },
    created_by: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'User',
        key: 'user_id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'apply',
    modelName: 'Apply',
    timestamps: false,
    indexes: [{ unique: true, fields: ['apply_id'] }]
  });
}