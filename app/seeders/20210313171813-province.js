"use strict";
const provinceData = require("../data/json/province.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("province", provinceData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("province", null, {});
  },
};
