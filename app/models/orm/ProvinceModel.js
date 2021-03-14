const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Province', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    name_th: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    name_en: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    region_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Province',
    tableName: 'province',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id' },
        ]
      },
    ]
  });
};
