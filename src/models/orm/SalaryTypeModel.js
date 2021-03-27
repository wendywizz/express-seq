module.exports = function (sequelize, DataTypes) {
  return sequelize.define('SalaryType', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'salarytype',
    modelName: 'SalaryType',
    timestamps: false
  });
}