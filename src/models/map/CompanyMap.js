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
    created_by: {
      [Op.eq]: id
    }
  }
  const { status, data, itemCount } = await getCompany(conditions)

  let row = null, message = "Data not found"
  if (data.length > 0) {
    row = data[0]
    message = "Data found"
  }
  return { status, data: row, itemCount, message }
}

async function saveByOwner(ownerId, data) {
  const { itemCount } = await getCompanyByOwner(ownerId)

  if (itemCount > 0) {
    return updateJobByOwner(ownerId, data)
  } else {
    return createCompany(ownerId, data)
  }
}

async function createCompany(ownerId, insertData) {
  let status = 0, data = null, message = "Add new company failed", error = null
  const newData = {
    created_at: currentDateTime(),
    created_by: ownerId,
    ...insertData
  }
  
  await Company.create(newData)
    .then(result => {
      status = 1
      data = result.dataValues
      message = "Add new company completed"
    })
    .catch(err => {
      error = err.message
    })

  return { status, data, message, error }
}

async function updateJobByOwner(ownerId, data) {
  let status = 0, returnData = null, message = `Update company#${ownerId} failed`, error = null
  const updateData = {
    updated_at: currentDateTime(),
    ...data
  }
  const conditions = {
    created_by: {
      [Op.eq]: ownerId
    }
  }
  await Company.update(updateData, { where: conditions })
    .then(async () => {
      const { data } = await getCompanyByOwner(ownerId)
      returnData = data
      status = 1
      message = `Update company#${ownerId} successed`
    }).catch(err => {    
      error = err.message
    })

  return { status, data: returnData, message, error }
}

module.exports = {
  getCompany,
  getCompanyByOwner,
  saveByOwner
}