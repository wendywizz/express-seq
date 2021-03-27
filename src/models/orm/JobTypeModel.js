module.exports = function (sequelize, DataTypes) {
  return sequelize.define("JobType", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: "jobtype",
    modelName: "JobType",
    timestamps: false
  })
}