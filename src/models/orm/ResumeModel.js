const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Resume', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    file_url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
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
    modelName: 'Resume',
    tableName: 'resume',
    timestamps: false,
  });
};
