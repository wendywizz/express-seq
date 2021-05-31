const { Province, District } = require("../orm")
const { Op } = require("sequelize")

async function listProvince() {
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

async function listDistrictByProvince(id) {
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

async function listProvinceByPk(pk) {
  let data = null, message = `Data id#${pk} not found`, error = null
  const conditions = {
    id: {
      [Op.eq]: pk
    },
  }
  await Province.findOne({ where: conditions })
  .then(result => {
    data = result
    message = `Data id#${pk} found`
  })
  .catch(e => {
    error = e.message
  })

  return { data, message, error }
}

async function getDistrictByPk(pk) {
  let data = null, message = `Data id#${pk} not found`, error = null
  const conditions = {
    id: {
      [Op.eq]: pk
    },
  }
  await District.findOne({ where: conditions })
  .then(result => {
    data = result
    message = `Data id#${pk} found`
  })
  .catch(e => {
    error = e.message
  })

  return { data, message, error }
}

module.exports = {
  listProvince,
  listDistrictByProvince,
  listProvinceByPk,
  getDistrictByPk
}