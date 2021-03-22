module.exports = function (sequelize, DataTypes) {
  return sequelize.define("JobType", {
    job_type_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    job_type_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: "job_type",
    modelName: "JobType",
    timestamps: false,
    indexes: [{ unique: true, fields: ['job_type_id'] }]
  })
}