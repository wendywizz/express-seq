'use strict';
const data = require("../data/json/job.json")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("job", null, {})
    await queryInterface.bulkInsert("job", data, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("job", null, {})
  }
};
