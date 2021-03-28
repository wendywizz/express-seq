const { Company } = require("../orm")
const { Op } = require("sequelize")
const { DISPLAY_START, DISPLAY_LENGTH } = require("../../constants/Record")
const { currentDateTime } = require("../../utils/DateTime")

async function getCompany(conditions=null, length=DISPLAY_LENGTH, start=DISPLAY_START) {
  let status = 0, data = [], message = "Data not found", itemCount = 0
  await Company.findAll({
    where: conditions,
    limit: length,
    offset: start,
    order: [
      ["created_at", "DESC"]
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

async function getCompanyByOwner(id) {
  const conditions = {
    company_owner: {
      [Op.eq]: id
    }
  }
  const { status, data, itemCount, message } = await getCompany(conditions, length, start)

  let row = null
  if (data.length > 0) {
    row = data[0]
  }
  return { status, data: row, itemCount, message }
}

async function save(id, saveData) {
  const { itemCount } = await getCompanyByOwner(id)
  let status = 0, message = "Save failed"

  if (itemCount > 0) {
    // Insert new data
  } else {
    // Update data
    const insertData = {
      created_at: currentDateTime(),
      ...saveData
    }
  }
}

module.exports = {
  getCompany,
  getCompanyByOwner,
  save
}