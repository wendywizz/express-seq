const { Company } = require("../orm")
const { Op } = require("sequelize")
const { DISPLAY_START, DISPLAY_LENGTH } = require("../../constants/Record")
const { currentDateTime } = require("../../utils/DateTime")

async function getCompany(conditions = null, length = DISPLAY_LENGTH, start = DISPLAY_START) {
  let data = [], message = "Data not found", itemCount = 0, error = null

  await Company.findAll({
    where: conditions,
    limit: length,
    offset: start,
    order: [
      ["created_at", "DESC"]
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

async function getCompanyByPK(pk) {
  const conditions = {
    company_id: {
      [Op.eq]: pk
    }
  }
  const { data, itemCount, error } = await getCompany(conditions)

  let row = null, message = `Data id#${pk} not found`
  if (data.length > 0) {
    row = data[0]
    message = `Data id#${pk} found`
  }
  return { data: row, itemCount, message, error }
}

async function getCompanyByOwner(id) {
  const conditions = {
    created_by: {
      [Op.eq]: id
    }
  }
  const { data, itemCount, error } = await getCompany(conditions)

  let row = null, message = `Data id#${id} not found`
  if (data.length > 0) {
    row = data[0]
    message = `Data id#${id} found`
  }
  return { data: row, itemCount, message, error }
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
  let success = false, data = null, message = "Add new company failed", error = null
  const newData = {
    created_at: currentDateTime(),
    created_by: ownerId,
    ...insertData
  }

  await Company.create(newData)
    .then(result => {
      success = true
      data = result.dataValues
      message = "Add new company completed"
    })
    .catch(e => {
      error = e.message
    })

  return { success, data, message, error }
}

async function updateJobByOwner(ownerId, data) {
  let success = false, returnData = null, message = `Update company#${ownerId} failed`, error = null
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
      success = true
      message = `Update company#${ownerId} successed`
    })
    .catch(e => {
      error = e.message
    })

  return { success, data: returnData, message, error }
}

module.exports = {
  getCompany,
  getCompanyByPK,
  getCompanyByOwner,
  saveByOwner
}