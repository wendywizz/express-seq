const { local, Job, JobType } = require("../orm")
const { Op, QueryTypes } = require("sequelize")
const moment = require("moment")
const { currentDateTime, formatDate } = require("../../utils/DateTime")
const { DISPLAY_START, DISPLAY_LENGTH } = require("../../constants/Record")
const JOB_AVAILABLE_DAY = 90

async function getJob(conditions = null, length = DISPLAY_LENGTH, start = DISPLAY_START) {
  let status = 0, result = [], message = "Data not found"
  
  await Job.findAll({
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

async function searchJob(params, length=DISPLAY_LENGTH, start=DISPLAY_START) {
  let status = 0, result = [], message = "Data not found"
  let sqlCommand = `
    SELECT 
      t.job_position, t.job_type, t.job_duty, t.job_performance, t.job_welfare, t.salary_min, t.salary_max,
      t.work_days, t.work_time_start, t.work_time_end, t.require, t.created_at AS created,
      c.company_name, c.logo_path AS company_logo, 
      st.salary_type_name, jt.job_type_name,
      d.name_th, p.name_th, r.name
    FROM Job AS t
    INNER JOIN company c ON t.company_owner = c.company_id
    INNER JOIN salary_type st ON t.salary_type = st.salary_type_id
    INNER JOIN job_type jt ON t.job_type = jt.job_type_id
    INNER JOIN district d ON t.district = d.id
    INNER JOIN province p ON t.province = p.id
    INNER JOIN region r ON t.region = r.id
    WHERE t.active = 1
    AND t.deleted = 0
    AND CURDATE() < t.expire_at
  `
  if (params.keyword) {
    sqlCommand += ` AND (t.job_position LIKE '%${params.keyword}%' OR c.company_name LIKE '%${params.keyword}%')`
  }
  if (params.job_type) {
    sqlCommand += ` AND t.job_type = ${params.job_type}`
  }
  if (params.salary_type) {
    sqlCommand += ` AND t.salary_type = ${params.salary_type}`
  }
  if (params.province) {
    if (Array.isArray(params.province)) {
      sqlCommand += ` AND t.province IN (${params.province})`
    }
  }
  if (params.district) {
    if (Array.isArray(params.district)) {
      sqlCommand += ` AND t.district IN (${params.district})`
    }
  }
  if (params.region) {
    if (Array.isArray(params.region)) {
      sqlCommand += ` AND t.region IN (${params.region})`
    }
  }
  sqlCommand += ` ORDER BY t.created_at DESC LIMIT ${length} OFFSET ${start}`

  await local
    .query(sqlCommand, { raw: true, type: QueryTypes.SELECT })
    .then(data => {
      if (data) {
        status = 1,
        result = data
        message = `Data found ${data.length} records`
      }
    })
  
  return { status, result, message }
}

async function getJobByID(id) {
  let status = 0, result = null, message = "Data not found"
  const conditions = {
    job_id: {
      [Op.eq]: id
    },
    deleted: {
      [Op.eq]: 0
    }
  }
  await Job.findOne({ where: conditions }).then(data => { 
    if (data) {
      status = 1
      result = data
      message = "Login successed"
    }
  }).catch(error => {
    message = error.message
  })

  return { status, result, message }
}

async function getJobType() {
  let status = 0, result = [], message = "No data found"
  await JobType.findAll().then(data => {
    status = 1
    result = data
    message = `There are data ${data.length} found`
  }).catch(error => {
    message = error.message
  })

  return { status, result, message }
}

async function createJob(data) {
  let status = 0, result = null, message = "Add new job failed"
  const insertData = {
    created_at: currentDateTime(),
    expire_at: formatDate(moment(currentDateTime()).add(JOB_AVAILABLE_DAY, "d")),
    ...data
  }
  await Job.create(insertData).then(data => {   
    if (data) {
      status = 1
      result = data.dataValues
      message = "Add new job completed"
    }
  }).catch(error => {
    message = error.message
  })

  return { status, result, message }
}

async function updateJobByID(id, data) {
  let status = 0, message = `Update job#${id} failed`
  const updateData = {
    updated_at: currentDateTime(),
    ...data
  }
  const conditions = {
    job_id: {
      [Op.eq]: id
    }
  }
  await Job.update(updateData, { where: conditions }).then(data => {
    if (data) {
      status = 1
      message = `Update job#${id} successed`
    }
  }).catch(error => {
    message = error.message
  })

  return { status, message }
}

async function deleteJobByID(id) {
  let status = 0, message = `Remove job#${id} failed`
  const updateFields = {
    deleted: true,
    active: false,
    updated_at: currentDateTime()
  }
  const conditions = {
    job_id: {
      [Op.eq]: id
    }
  }
  await Job.update(updateFields, { where: conditions }).then(() => {
    status = 1
    message = `Remove job#${id} successed`
  }).catch(error => {
    message = error.message
  })

  return { status, message }
}

module.exports = {
  searchJob,
  getJobByID,
  getJob,
  getJobType,
  createJob,
  updateJobByID,
  deleteJobByID
}