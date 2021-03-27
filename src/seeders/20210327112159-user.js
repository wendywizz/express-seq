'use strict';
const data = require("../data/json/user.json")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("user", null, {})
    await queryInterface.bulkInsert("user", data, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("user", null, {})
  }
};
