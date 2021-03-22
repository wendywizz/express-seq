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
    region: {
      type: DataTypes.INTEGER,
      allowNull: false,
      /*references: {
        model: 'Region',
        key: 'id',
        as: 'region'
      }*/
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
