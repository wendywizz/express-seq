var DataTypes = require("sequelize").DataTypes;
var _rstudent = require("./rstudent");

function initModels(sequelize) {
  var rstudent = _rstudent(sequelize, DataTypes);

  return {
    rstudent,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
