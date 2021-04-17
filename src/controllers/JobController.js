const { JobMap } = require("../models/map")

async function view(req, res) {
  const { id } = req.query
  const { data, message, error } = await JobMap.getJobByID(id)

  res.send({ data, message, error })
}

async function search(req, res) {
  const { keyword, job_type, category, salary_type, salary_min, salary_max, province, district, region } = req.query
  const params = {
    keyword,
    job_type,
    salary_type,
    category,
    salary_min,
    salary_max,
    province,
    district,
    region
  }
  const { data, message, error } = await JobMap.searchJob(params)

  res.send({ data, message, itemCount: data.length, error })
}

async function getJobType(req, res) {
  const { data, itemCount, message, error } = await JobMap.getJobType()

  res.send({ data, itemCount, message, error })
}

async function getJobCategory(req, res) {
  const { data, itemCount, message, error } = await JobMap.getJobCategory()

  res.send({ data, itemCount, message, error })
}

async function getSalaryType(req, res) {
  const { data, itemCount, message, error } = await JobMap.getSalaryType()

  res.send({ data, itemCount, message, error })
}

async function getJobOfCompany(req, res) {
  const { id } = req.body
  const { data, itemCount, message, error } = await JobMap.getJobOfCompany(id)

  res.send({ data, itemCount, message, error })
}

async function add(req, res) {  
  const { position, job_type, category, duty, performance, welfare, salary_type, salary_min, salary_max, work_days, work_timestart, work_timeend, district, province, region, amount, company_owner, created_by } = req.body  
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
    work_days: work_days,
    work_time_start: work_timestart,
    work_time_end: work_timeend,
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
  const { position, job_type, category, duty, performance, welfare, salary_type, salary_min, salary_max, work_days, work_timestart, work_timeend, district, province, region, amount, id } = req.body
  
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
    work_days: work_days,
    work_time_start: work_timestart,
    work_time_end: work_timeend,
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
  const { id } = req.body
  const { success, message, error } = await JobMap.setActiveJobById(id)

  res.send({ success, message, error })
}

module.exports = {
  view,
  search,
  getJobType,
  getJobCategory,
  getSalaryType,
  getJobOfCompany,
  add,
  save,
  remove,
  setActive
}