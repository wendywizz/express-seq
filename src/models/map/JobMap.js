const { local, Job, JobType, SalaryType, Province, District, Region, JobCategory, Company } = require("../orm")
const { Op, QueryTypes } = require("sequelize")
const moment = require("moment")
const { currentDateTime, formatDate } = require("../../utils/DateTime")
const { DISPLAY_START, DISPLAY_LENGTH } = require("../../constants/Record")
const JOB_AVAILABLE_DAY = 90

async function getJob(conditions = null, length = DISPLAY_LENGTH, start = DISPLAY_START) {
  let data = [], itemCount = 0, message = "Data not found", error = null

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
    data = result
    itemCount = data.length
    message = `Data has been found ${data.length} records`
  }).catch(e => {
    error = e.message
  })

  return { data, itemCount, message, error }
}

async function searchJob(params, length = DISPLAY_LENGTH, start = DISPLAY_START) {
  let data = [], itemCount = 0, message = "Data not found", error = null
  let conditions = {
    active: {
      [Op.eq]: 1
    }
  }
  if (params.keyword) {
    conditions.job_position = {
      [Op.like]: "%"+params.keyword+"%"
    }
  }
  if (params.jobCategory) {
    conditions.job_category = {
      [Op.in]: typeof(params.jobCategory) === "object" ? params.jobCategory : [params.jobCategory]
    }
  }
  if (params.jobType) {
    conditions.job_type = {
      [Op.eq]: params.jobType
    }
  }
  if (params.salaryMin) {
    conditions.salary_min = {
      [Op.gte]: params.salaryMin
    }
  }
  if (params.salaryMax) {
    conditions.salary_max = {
      [Op.lte]: params.salaryMax
    }
  }
  if (params.province) {
    conditions.province = {
      [Op.eq]: params.province
    }
  }
  if (params.district) {
    conditions.district = {
      [Op.eq]: params.district
    }
  }
  
  await Job.findAll({
    where: conditions,
    order: [
      ['created_at', 'DESC']
    ],
    limit: length,
    offset: start,
    include: [
      { model: JobType, as: "job_type_asso" },
      { model: SalaryType, as: "salary_type_asso" },
      { model: Province, as: "province_asso" },
      { model: District, as: "district_asso" },
      { model: Company, as: "company_owner_asso" },
    ]
  })
  .then(result => {
    data = result
    itemCount = data.length
    message = `There are data ${data.length} found`
  })
  .catch(e => {
    error = e.message
  })

  return { data, itemCount, message, error }
}

async function getJobByID(id) {
  let data = null, message = `Data id#${id} not found`, error = null
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
      { model: JobCategory, as: "job_category_asso" },
      { model: SalaryType, as: "salary_type_asso" },
      { model: Province, as: "province_asso" },
      { model: District, as: "district_asso" },
      {
        model: Company,
        as: "company_owner_asso",
        include: [
          { model: Province, as: "province_asso" },
          { model: District, as: "district_asso" }
        ]    
      }
    ]
  })
  .then(result => {
    data = result
    message = `Data id#${id} found`
  })
  .catch(e => {
    error = e.message
  })

  return { data, message, error }
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
  const { data, itemCount, message, error } = await getJob(conditions, length, start)

  return { data, itemCount, message, error }
}

async function getJobType() {
  let data = [], itemCount = 0, message = "No data found", error = null

  await JobType.findAll()
    .then(result => {
      data = result
      itemCount = data.length
      message = `There are data ${data.length} found`
    }).catch(e => {
      error = e.message
    })

  return { data, itemCount, message, error }
}

async function getJobCategory() {
  let data = [], itemCount = 0, message = "No data found", error = null

  await JobCategory.findAll()
    .then(result => {
      data = result
      itemCount = data.length
      message = `There are data ${data.length} found`
    }).catch(e => {
      error = e.message
    })

  return { data, itemCount, message, error }
}

async function getSalaryType() {
  let data = [], itemCount = 0, message = "No data found", error = null

  await SalaryType.findAll()
    .then(result => {
      data = result
      itemCount = data.length
      message = `There are data ${data.length} found`
    })
    .catch(e => {
      error = e.message
    })

  return { data, itemCount, message, error }
}

async function createJob(insertData) {
  let success = false, data = null, message = "Add new job failed", error = null
  const newData = {
    created_at: currentDateTime(),
    expire_at: formatDate(moment(currentDateTime()).add(JOB_AVAILABLE_DAY, "d")),
    ...insertData
  }

  await Job.create(newData)
    .then(result => {
      success = true
      data = result.dataValues
      message = "Add new job completed"
    })
    .catch(e => {
      error = e.message
    })

  return { success, data, message, error }
}

async function updateJobByID(id, data) {
  let success = false, returnData = null, message = `Update job#${id} failed`, error = null
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
    .then(async () => {
      const { data } = await getJobByID(id)

      success = true
      returnData = data      
      message = `Update job#${id} successed`
    }).catch(e => {
      error = e.message
    })

  return { success, data: returnData, message, error }
}

async function deleteJobByID(id) {
  let success = false, message = `Remove job#${id} failed`, error = null
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
      success = true
      message = `Remove job#${id} successed`
    })
    .catch(e => {
      error = e.message
    })

  return { success, message, error }
}

async function setActiveJobById(id, isActive) {
  let success = false, message = `Set active job#${id} failed`, error = null
  const updateFields = {
    active: isActive,
    updated_at: currentDateTime()
  }
  const conditions = {
    job_id: {
      [Op.eq]: id
    }
  }
  await Job.update(updateFields, { where: conditions })
    .then(() => {
      success = true
      message = `Set active job#${id} sucessed`
    })
    .catch(e => {
      error = e.message
    })
  
  return { success, message, error }
}

module.exports = {
  searchJob,
  getJobByID,
  getJob,
  getJobType,
  getJobCategory,
  getSalaryType,
  getJobOfCompany,
  createJob,
  updateJobByID,
  deleteJobByID,
  setActiveJobById
}