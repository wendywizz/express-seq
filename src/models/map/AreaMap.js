const { Province, District } = require("../orm")
const { Op } = require("sequelize")

async function getProvince() {
  let status = 0, data = [], itemCount = 0, message = "Data not found"

  await Province.findAll({
    attributes: ["id", "code", "name_th", "name_en"],
    order: [
      ["name_th", "ASC"],
      ["name_en", "ASC"]
    ]
  }).then(result => {
    status = 1
    data = result
    message = `Data has been found ${data.length} records`
    itemCount = data.length
  }).catch(error => {
    message = error.message
  })

  return { status, data, itemCount, message }
}

async function getDistrictByProvince(id) {
  let status = 0, data = [], itemCount = 0, message = "Data not found"

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
    status = 1
    data = result
    message = `Data has been found ${data.length} records`
    itemCount = data.length
  }).catch(error => {
    message = error.message
  })

  return { status, data, itemCount, message }
}

module.exports = {
  getProvince,
  getDistrictByProvince
}