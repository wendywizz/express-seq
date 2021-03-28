const { local, Job, JobType, SalaryType, Province, District, Region } = require("../orm")
const { Op, QueryTypes } = require("sequelize")
const moment = require("moment")
const { currentDateTime, formatDate } = require("../../utils/DateTime")
const { DISPLAY_START, DISPLAY_LENGTH } = require("../../constants/Record")
const JOB_AVAILABLE_DAY = 90

async function getJob(conditions = null, length = DISPLAY_LENGTH, start = DISPLAY_START) {
  let status = 0, data = [], itemCount = 0, message = "Data not found"

  await Job.findAll({
    where: conditions,
    limit: length,
    offset: start,
    order: [
      ["created_at", "DESC"]
    ],
    include: [
      { model: JobType, as: "job_type_asso" },
      { model: SalaryType, as: "salary_type_asso" },
      {
        model: Province,
        as: "province_asso",
        attributes: ["id", ["name_th", "name"]]
      },
      {
        model: District,
        as: "district_asso",
        attributes: ["id", ["name_th", "name"]]
      },
      {
        model: Region,
        as: "region_asso",
        attributes: ["id", "name"]
      }
    ]
  }).then(result => {
    status = 1
    data = result
    itemCount = data.length
    message = `Data has been found ${data.length} records`
  }).catch(error => {
    message = error.message
  })

  return { status, data, itemCount, message }
}

async function searchJob(params, length = DISPLAY_LENGTH, start = DISPLAY_START) {
  let status = 0, data = [], message = "Data not found"
  let sqlCommand = `
    SELECT 
      t.job_position, t.job_type, t.job_duty, t.job_performance, t.job_welfare, t.salary_min, t.salary_max,
      t.work_days, t.work_time_start, t.work_time_end, t.require, t.created_at AS created,
      c.company_name, c.logo_path AS company_logo, 
      st.id AS salary_type, st.name AS salary_type_name, 
      jt.id AS job_type, jt.name AS job_type_name,
      d.name_th, p.name_th, r.name
    FROM Job AS t
    INNER JOIN company c ON t.company_owner = c.company_id
    INNER JOIN salary_type st ON t.salary_type = st.id
    INNER JOIN job_type jt ON t.job_type = jt.id
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
    .then(result => {
      status = 1,
        data = result
      message = `Data found ${data.length} records`
    })

  return { status, data, message }
}

async function getJobByID(id) {
  let status = 0, data = null, message = "Data not found"
  const conditions = {
    job_id: {
      [Op.eq]: id
    },
    deleted: {
      [Op.eq]: 0
    }
  }
  await Job.findOne({
    where: conditions,
    include: [
      { model: JobType, as: "job_type_asso" },
      { model: SalaryType, as: "salary_type_asso" },
      {
        model: Province,
        as: "province_asso",
        attributes: ["id", ["name_th", "name"]]
      },
      {
        model: District,
        as: "district_asso",
        attributes: ["id", ["name_th", "name"]]
      },
      {
        model: Region,
        as: "region_asso",
        attributes: ["id", "name"]
      }
    ]
  }).then(result => {
    status = 1
    data = result
    message = `Data id#${id} found`
  }).catch(error => {
    message = error.message
  })

  return { status, data, message }
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
  const { status, data, itemCount, message } = await getJob(conditions, length, start)

  return { status, data, itemCount, message }
}

async function getJobType() {
  let status = 0, data = [], itemCount = 0, message = "No data found"

  await JobType.findAll()
    .then(result => {
      status = 1
      data = result
      itemCount = data.length
      message = `There are data ${data.length} found`
    }).catch(error => {
      message = error.message
    })

  return { status, data, itemCount, message }
}

async function createJob(insertData) {
  let status = 0, data = null, message = "Add new job failed"
  const newData = {
    created_at: currentDateTime(),
    expire_at: formatDate(moment(currentDateTime()).add(JOB_AVAILABLE_DAY, "d")),
    ...insertData
  }
  await Job.create(newData)
    .then(result => {
      status = 1
      data = result.dataValues
      message = "Add new job completed"
    }).catch(error => {
      message = error.message
    })

  return { status, data, message }
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
  await Job.update(updateData, { where: conditions })
    .then(() => {
      status = 1
      message = `Update job#${id} successed`
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
  await Job.update(updateFields, { where: conditions })
    .then(() => {
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
  getJobOfCompany,
  createJob,
  updateJobByID,
  deleteJobByID
}