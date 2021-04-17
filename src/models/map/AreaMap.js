const { Province, District } = require("../orm")
const { Op } = require("sequelize")

async function getProvince() {
  let data = [], itemCount = 0, message = "Data not found", error = null

  await Province.findAll({
    attributes: ["id", "code", "name_th", "name_en"],
    order: [
      ["name_th", "ASC"],
      ["name_en", "ASC"]
    ]
  }).then(result => {
    data = result
    message = `Data has been found ${data.length} records`
    itemCount = data.length
  }).catch(e => {
    error = e.message
  })

  return { data, itemCount, message, error }
}

async function getDistrictByProvince(id) {
  let data = [], itemCount = 0, message = "Data not found", error = null

  await District.findAll({
    attributes: ["id", "code", "name_th", "name_en"],
    where: {
      province: {
        [Op.eq]: id
      }
    },
    order: [
      ["name_th", "ASC"],
      ["name_en", "ASC"]
    ]
  }).then(result => {
    data = result
    message = `Data has been found ${data.length} records`
    itemCount = data.length
  }).catch(e => {
    error = e.message
  })

  return { data, itemCount, message, error }
}

module.exports = {
  getProvince,
  getDistrictByProvince
}