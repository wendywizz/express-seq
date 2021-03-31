const { JobMap } = require("../models/map")

async function view(req, res) {
  const { id } = req.query
  const { status, data, message } = await JobMap.getJobByID(id)

  res.send({ status, data, message })
}

async function search(req, res) {
  const { keyword, jtid, stid, s_min, s_max, pid, did, rid } = req.query
  const params = {
    keyword,
    job_type: jtid,
    salary_type: stid,
    salary_min: s_min,
    salary_max: s_max,
    province: pid,
    district: did,
    region: rid
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
  const { position, job_type, duty, performance, welfare, salary_type, salary_min, salary_max, work_days, work_timestart, work_timeend, area_did, area_pid, area_rid, amount, cid, uid } = req.body  
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
    district: area_did,
    province: area_pid,    
    region: area_rid,
    amount: amount,
    company_owner: cid,
    created_by: uid
  }
  const { status, data, message } = await JobMap.createJob(newData)

  res.send({ status, data, message })
}

async function save(req, res) {
  const { position, job_type, duty, performance, welfare, salary_type, salary_min, salary_max, work_days, work_timestart, work_timeend, sub_area, area, country, amount, id } = req.body
  const data = {
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
    sub_area: sub_area,
    area: area,
    country: country,
    amount: amount,
  }
  const { status, message } = await JobMap.updateJobByID(id, data)

  res.send({ status, message })
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