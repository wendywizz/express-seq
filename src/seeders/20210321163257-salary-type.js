'use strict';
const data = require("../data/json/salary-type.json")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("salarytype", null, {})
    await queryInterface.bulkInsert("salarytype", data, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("salarytype", null, {})
  }
};
