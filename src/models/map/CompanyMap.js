const { Company } = require("../orm")
const { Op } = require("sequelize")
const { DISPLAY_START, DISPLAY_LENGTH } = require("../../constants/Record")
const { currentDateTime } = require("../../utils/DateTime")
let { UPLOAD_COMPANY_LOGO_PATH } = require("../../config/path")
const fs = require("fs")

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

async function saveByOwner(userId, data) {
  const { itemCount } = await getCompanyByOwner(userId)

  if (itemCount > 0) {
    return updateJobByOwner(userId, data)
  } else {
    return createCompany(userId, data)
  }
}

async function createCompany(userId, insertData) {
  let success = false, data = null, message = "Add new company failed", error = null
  const newData = {
    created_at: currentDateTime(),
    created_by: userId,
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

async function updateJobByOwner(userId, data) {
  let success = false, returnData = null, message = `Update company#${userId} failed`, error = null
  const updateData = {
    updated_at: currentDateTime(),
    ...data
  }
  const conditions = {
    created_by: {
      [Op.eq]: userId
    }
  }
  await Company.update(updateData, { where: conditions })
    .then(async () => {
      const { data } = await getCompanyByOwner(userId)
      returnData = data
      success = true
      message = `Update company#${userId} successed`
    })
    .catch(e => {
      error = e.message
    })

  return { success, data: returnData, message, error }
}

async function uploadLogoByPK(companyId, file, reqUrl) {
  let success, imageUrl = null, message = 'Upload image failed', error = null

  if (file) {
    let oldLogofileName = null
    const { data, error } = await getCompanyByPK(companyId)

    if (!error) {
      oldLogofileName = data.logo_file

      const updateData = { 
        logo_file: file.filename,
        updated_at: currentDateTime(),
      }
      const conditions = { 
        company_id: {
          [Op.eq]: companyId 
        }
      }   
      await Company.update(updateData, { where: conditions })
        .then(async () => {
          success = true
          imageUrl = reqUrl + '/employer/' + file.filename
          message = 'Upload image successed'

          // Remove old file
          if (oldLogofileName) {
            let imagePath = __dir + UPLOAD_COMPANY_LOGO_PATH + oldLogofileName
            console.log("image=",imagePath)
            //await fs.unlink(imagePath)
          }
        })
        .catch(e => {
          error = e.message
        })
    }
  }

  return { success, imageUrl, message, error }
}

module.exports = {
  getCompany,
  getCompanyByPK,
  getCompanyByOwner,
  createCompany,
  saveByOwner,
  uploadLogoByPK
}