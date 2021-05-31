const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Company", {
    company_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    company_name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    logo_file: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    province: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Province",
        key: "id",
        as: "province"
      }
    },
    district: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "District",
        key: "id",
        as: "district"
      }
    },
    postcode: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    region: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Region",
        key: "id",
        as: "region"
      }
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
      allowNull: false,
      references: {
        model: "User",
        key: "user_id",
        as: "created_by"
      }
    }
  }, {
    sequelize,
    tableName: "company",
    modelName: "Company",
    timestamps: false,
    indexes: [{ unique: true, fields: ["company_id", "company_name"] }]
  })
}