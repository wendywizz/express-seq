'use strict';
const data = require("../data/json/job-category.json")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("jobcategory", null, {})
    await queryInterface.bulkInsert("jobcategory", data, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("jobcategory", null, {})
  }
};
