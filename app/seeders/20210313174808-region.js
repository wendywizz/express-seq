"use strict";
const regionData = require("../data/json/region.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("region", regionData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("region", null, {});
  },
};
