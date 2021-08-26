const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Student", {
    student_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    student_code: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(250),
      allowNull: false
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
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
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
    tableName: "student",
    modelName: "Student",
    timestamps: false,
    indexes: [{ unique: true, fields: ["student_id", "student_code", "first_name", "last_name"] }]
  })
}