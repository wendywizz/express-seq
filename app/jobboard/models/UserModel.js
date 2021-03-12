const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    user_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false
    },
    user_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    email: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    student_id: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    person_id: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    notify_email: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    notify_sms: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    binding_facebook: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    binding_google: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    latest_login_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user',
    modelName: 'User',
    timestamps: false,
    indexes: [{ unique: true, fields: ['user_id'] }]
  })
}
