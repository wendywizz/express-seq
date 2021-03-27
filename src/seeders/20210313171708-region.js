"use strict";
const data = require("../data/json/region.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("region", null, {})
    await queryInterface.bulkInsert("region", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("region", null, {});
  },
};
