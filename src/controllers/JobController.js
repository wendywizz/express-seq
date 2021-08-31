const { JobMap } = require("../models/map")
const { CATEGORY_IMAGE_PATH, LOGO_SOURCE_PATH } = require("../config/path")

async function view(req, res) {
  const { id } = req.query
  const { data, message, error } = await JobMap.getJobByID(id)

  const serverUrl = req.protocol + '://' + req.get('host') + "/"
  const rData = {
    ...data.dataValues,
    logo_source_url: serverUrl + LOGO_SOURCE_PATH
  }

  res.send({ data: rData, message, error })
}

async function search(req, res) {
  const { keyword, category, type, salary_min, salary_max, province, district, length, start, sorting } = req.query
  const params = {
    keyword,
    jobType: type,
    jobCategory: category,
    province,
    district,
    salaryMin: salary_min,
    salaryMax: salary_max,
  }
  const { data, itemCount, message, error } = await JobMap.searchJob(params, length, start, sorting)

  const serverUrl = req.protocol + '://' + req.get('host') + "/"
  const rData = data.map(value => {
    return {
      ...value.dataValues,
      logo_source_url: serverUrl + LOGO_SOURCE_PATH
    }
  })

  res.send({ data: rData, message, itemCount, error })
}

async function getJobType(req, res) {
  const { data, itemCount, message, error } = await JobMap.getJobType()

  res.send({ data, itemCount, message, error })
}

async function getJobCategory(req, res) {
  const { data, itemCount, message, error } = await JobMap.getJobCategory()
  
  const serverUrl = req.protocol + '://' + req.get('host') + "/"
  const rData = data.map(value => {
    return {
      ...value.dataValues,
      image: serverUrl + CATEGORY_IMAGE_PATH + value.image
    }
  })

  res.send({ data: rData, itemCount, message, error })
}

async function getSalaryType(req, res) {
  const { data, itemCount, message, error } = await JobMap.getSalaryType()

  res.send({ data, itemCount, message, error })
}

async function getJobOfCompany(req, res) {
  const { id, start, length, status } = req.body
  const { data, itemCount, message, error } = await JobMap.getJobOfCompany(id, length, start, status)

  res.send({ data, itemCount, message, error })
}

async function add(req, res) {  
  const { position, job_type, category, duty, performance, welfare, salary_type, salary_min, salary_max, district, province, region, amount, company_owner, created_by } = req.body  
  const newData = {
    job_position: position,
    job_type: job_type,
    job_category: category,
    job_duty: duty,
    job_performance: performance,
    job_welfare: welfare,
    salary_type: salary_type,
    salary_min: salary_min,
    salary_max: salary_max,
    district: district,
    province: province,    
    region: region,
    amount: amount,
    company_owner: company_owner,
    created_by: created_by
  }
  const { success, data, message, error } = await JobMap.createJob(newData)

  res.send({ success, data, message, error })
}

async function save(req, res) {
  const { position, job_type, category, duty, performance, welfare, salary_type, salary_min, salary_max, district, province, region, amount, id } = req.body
  
  const updateData = {
    job_position: position,
    job_type: job_type,
    job_category: category,
    job_duty: duty,
    job_performance: performance,
    job_welfare: welfare,
    salary_type: salary_type,
    salary_min: salary_min,
    salary_max: salary_max,
    district: district,
    province: province,
    region: region,
    amount: amount,
  }
  const { success, data, message, error } = await JobMap.updateJobByID(id, updateData)

  res.send({ success, data, message, error })
}

async function remove(req, res) {
  const { id } = req.body
  const { success, message, error } = await JobMap.deleteJobByID(id)

  res.send({ success, message, error })
}

async function setActive(req, res) {
  const { id, active } = req.body
  const { success, message, error } = await JobMap.setActiveJobById(id, active)

  res.send({ success, message, error })
}

async function countAllActiveJob(req, res) {
  const { itemCount, error } = await JobMap.countAllActiveJob()

  res.send({ itemCount, error })
}

module.exports = {
  view,
  search,
  getJobType,
  getJobCategory,
  getSalaryType,
  getJobOfCompany,
  countAllActiveJob,
  add,
  save,
  remove,
  setActive
}