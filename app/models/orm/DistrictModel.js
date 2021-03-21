const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('district', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(4),
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
    province: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Province',
        key: 'id',
        as: 'province'
      }
    }
  }, {
    sequelize,
    modelName: 'District',
    tableName: 'district',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id' },
        ]
      },
    ]
  });
};
