const { Province, District } = require("../orm")
const { Op } = require("sequelize")

async function getProvince() {
  let status = 0, result = [], message = "Data not found"

  await Province.findAll({
    attributes: ["id", "code", "name_th", "name_en"],
    order: [
      ["name_th", "ASC"],
      ["name_en", "ASC"]
    ]
  }).then(data => {
    if (data) {
      status = 1
      result = data
      message = `Data has been found ${data.length} records`
    }
  }).catch(error => {
    message = error.message
  })

  return { status, result, message }
}

async function getDistrictByProvince(id) {
  let status = 0, result = [], message = "Data not found"

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
  }).then(data => {
    if (data) {
      status = 1
      result = data
      message = `Data has been found ${data.length} records`
    }
  }).catch(error => {
    message = error.message
  })

  return { status, result, message }
}

module.exports = {
  getProvince,
  getDistrictByProvince
}