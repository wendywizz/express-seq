'use strict';
const data = require("../data/json/student.json")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("student", null, {})
    await queryInterface.bulkInsert("student", data, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("student", null, {})
  }
};
