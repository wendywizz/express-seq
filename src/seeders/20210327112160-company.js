'use strict';
const data = require("../data/json/company.json")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("company", null, {})
    await queryInterface.bulkInsert("company", data, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("company", null, {})
  }
};
