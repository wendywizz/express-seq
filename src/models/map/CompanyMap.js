const { Company } = require("../orm")
const { Op } = require("sequelize")
const moment = require("moment")
const { DISPLAY_START, DISPLAY_LENGTH } = require("../../constants/Record")

async function getCompany(conditions=null, length=DISPLAY_LENGTH, start=DISPLAY_START) {
  let status = 0, result = [], message = "Data not found"
  await Company.findAll({
    where: conditions,
    limit: length,
    offset: start,
    order: [
      ["created_at", "DESC"]
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

async function getCompanyByOwner(id) {
  const conditions = {
    company_owner: {
      [Op.eq]: id
    }
  }
  const { status, result, message } = await getCompany(conditions, length, start)

  let row = null
  if (result.length > 0) {
    row = result[0]
  }
  return { status, result: row, message }
}

async function save(id, data) {

}

module.exports = {
  getCompany,
  getCompanyByOwner,
  save
}