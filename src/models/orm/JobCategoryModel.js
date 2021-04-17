module.exports = function (sequelize, DataTypes) {
  return sequelize.define("JobCategory", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: "jobcategory",
    modelName: "JobCategory",
    timestamps: false
  })
}