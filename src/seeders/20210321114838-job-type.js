'use strict';
const data = require("../data/json/job-type.json")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("jobtype", null, {})
    await queryInterface.bulkInsert("jobtype", data, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("jobtype", null, {})
  }
};
