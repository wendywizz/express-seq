const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Company', {
    company_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false
    },
    company_name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    logo_path: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    company_about: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sub_area: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    postcode: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    country: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 66
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    website: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    facebook: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_by: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'company',
    modelName: 'Company',
    timestamps: false,
    indexes: [{ unique: true, fields: ['company_id', 'company_name'] }]
  })
}