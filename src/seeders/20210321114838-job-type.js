'use strict';
const data = require("../data/json/job-type.json")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("job_type", null, {})
    await queryInterface.bulkInsert("job_type", data, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("job_type", null, {})
  }
};
