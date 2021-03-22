"use strict";
const data = require("../data/json/province.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {   
    await queryInterface.bulkDelete("province", null, {}) 
    await queryInterface.bulkInsert("province", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("province", null, {});
  },
};
