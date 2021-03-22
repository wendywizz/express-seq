"use strict";
const data = require("../data/json/district.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("district", null, {})
    await queryInterface.bulkInsert("district", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("district", null, {});
  },
};
