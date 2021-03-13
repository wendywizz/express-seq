"use strict";
const districtData = require("../data/json/district.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("district", districtData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("district", null, {});
  },
};
