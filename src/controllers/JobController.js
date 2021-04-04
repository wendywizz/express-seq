const { JobMap } = require("../models/map")

async function view(req, res) {
  const { id } = req.query
  const { status, data, message } = await JobMap.getJobByID(id)

  res.send({ status, data, message })
}

async function search(req, res) {
  const { keyword, job_type, salary_type, salary_min, salary_max, province, district, region } = req.query
  const params = {
    keyword,
    job_type,
    salary_type,
    salary_min,
    salary_max,
    province,
    district,
    region
  }
  const { status, data, message } = await JobMap.searchJob(params)

  res.send({ status, data, message, itemCount: data.length })
}

async function getJobType(req, res) {
  const { status, data, itemCount, message } = await JobMap.getJobType()

  res.send({ status, data, itemCount, message })
}

async function getSalaryType(req, res) {
  const { status, data, itemCount, message } = await JobMap.getSalaryType()

  res.send({ status, data, itemCount, message })
}

async function getJobOfCompany(req, res) {
  const { id } = req.body
  const { status, data, itemCount, message } = await JobMap.getJobOfCompany(id)

  res.send({ status, data, itemCount, message })
}

async function add(req, res) {  
  const { position, job_type, duty, performance, welfare, salary_type, salary_min, salary_max, work_days, work_timestart, work_timeend, district, province, region, amount, company_owner, created_by } = req.body  
  const newData = {
    job_position: position,
    job_type: job_type,
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
  const { status, data, message, error } = await JobMap.createJob(newData)

  res.send({ status, data, message, error })
}

async function save(req, res) {
  const { position, job_type, duty, performance, welfare, salary_type, salary_min, salary_max, work_days, work_timestart, work_timeend, district, province, region, amount, id } = req.body
  
  const updateData = {
    job_position: position,
    job_type: job_type,
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
  const { status, data, message, error } = await JobMap.updateJobByID(id, updateData)

  res.send({ status, data, message, error })
}

async function remove(req, res) {
  const { id } = req.body
  const { status, message } = await JobMap.deleteJobByID(id)

  res.send({ status, message })
}

module.exports = {
  view,
  search,
  getJobType,
  getSalaryType,
  getJobOfCompany,
  add,
  save,
  remove
}