const { Company } = require("../orm")
const { Op } = require("sequelize")
const { getJob } = require("./JobMap")
const { DISPLAY_START, DISPLAY_LENGTH } = require("../../constants/Record")
const { currentDateTime } = require("../../utils/DateTime")

async function getCompany(conditions=null, length=DISPLAY_LENGTH, start=DISPLAY_START) {
  let status = 0, result = [], message = "Data not found", itemCount = 0
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
      itemCount = data.length
    }
  }).catch(error => {
    message = error.message
  })

  return { status, result, itemCount, message }
}

async function getCompanyByOwner(id) {
  const conditions = {
    company_owner: {
      [Op.eq]: id
    }
  }
  const { status, result, itemCount, message } = await getCompany(conditions, length, start)

  let row = null
  if (result.length > 0) {
    row = result[0]
  }
  return { status, result: row, itemCount, message }
}

async function save(id, data) {
  const { itemCount } = await getCompanyByOwner(id)
  let status = 0, result = null, message = "Save failed"

  if (itemCount > 0) {
    // Insert new data
  } else {
    // Update data
    const insertData = {
      created_at: currentDateTime(),
      ...data
    }
  }
}

async function getJobOfCompany(id, length = DISPLAY_LENGTH, start = DISPLAY_START) {
  const conditions = {
    company_owner: {
      [Op.eq]: id
    },
    deleted: {
      [Op.eq]: 0
    }
  }
  const { status, result, itemCount, message } = await getJob(conditions, length, start)

  return { status, result, itemCount, message }
}

module.exports = {
  getCompany,
  getCompanyByOwner,
  getJobOfCompany,
  save
}