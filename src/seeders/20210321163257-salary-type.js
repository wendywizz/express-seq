'use strict';
const data = require("../data/json/salary-type.json")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("salary_type", null, {})
    await queryInterface.bulkInsert("salary_type", data, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("salary_type", null, {})
  }
};
