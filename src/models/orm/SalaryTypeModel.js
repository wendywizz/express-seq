module.exports = function (sequelize, DataTypes) {
  return sequelize.define('SalaryType', {
    salary_type_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    salary_type_name: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'salary_type',
    modelName: 'SalaryType',
    timestamps: false,
    indexes: [{ unique: true, fields: [ 'salary_type_id' ] }]
  });
}