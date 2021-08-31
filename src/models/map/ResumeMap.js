const { Resume, User } = require("../orm")
const { Op } = require("sequelize")
const { currentDateTime } = require("../../utils/DateTime")

async function getResume(params, length, start) {
  let data = [], message = "Data not found", error = null
  let conditions = {
    deleted: {
      [Op.eq]: 0
    },
  }
  if (params.id) {
    conditions.id = {
      [Op.eq]: params.id
    }
  }
  if (params.created_by) {
    conditions.created_by = {
      [Op.eq]: params.created_by
    }
  }
  
  await Resume.findAll({
    where: conditions,
    order: [["created_at", "DESC"]],
    limit: length && Number(length),
    offset: start && Number(start),
    include: [
      { model: User, as: "user_asso" }
    ]
  })
    .then(result => {
      data = result
      message = `There are data ${result.length} found`
    })
    .catch(e => {
      error = e.message
    })

  return { data, message, error }
}

async function getResumeByUserId(userId) {
  const params = {
    created_by: userId
  }

  return await getResume(params)
}

async function createResume(insertData) {
  let success = false, message = "Add new company failed", error = null
  const newData = {
    created_at: currentDateTime(),
    ...insertData
  }

  await Resume.create(newData)
    .then(() => {
      success = true
      message = "Add resume completed"
    })
    .catch(e => {
      error = e.message
    })

  return { success, message, error }
}

async function deleteResumeByPk(id) {
  let success = false, message = `Remove resume#${id} failed`, error = null
  const updateFields = {
    deleted: true,
  }
  const conditions = {
    id: {
      [Op.eq]: id
    }
  }
  await Resume.update(updateFields, { where: conditions })
    .then(() => {
      success = true
      message = `Remove resume#${id} successed`
    })
    .catch(e => {
      error = e.message
    })

  return { success, message, error }
}

module.exports = {
  getResumeByUserId,
  createResume,
  deleteResumeByPk
}