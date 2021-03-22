const { JobMap } = require("../models/map")

async function view(req, res) {
  const { id } = req.query
  const { status, result, message } = await JobMap.getJobByID(id)

  res.send({ status, result, message })
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
  const { status, result, message } = await JobMap.searchJob(params)

  res.send({ status, result, message, itemCount: result.length })
}

async function listByCompany(req, res) {
  const { id } = req.query
  const { status, result, message } = await JobMap.getJobByCompany(id)

  res.send({ status, result, message, itemCount: result.length })
}

async function add(req, res) {
  const { position, job_type, duty, performance, welfare, salary_type, salary_min, salary_max, work_days, work_timestart, work_timeend, area_did, area_pid, area_rid, require, cid, uid } = req.body
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
    district: area_did,
    province: area_pid,    
    region: area_rid,
    require: require,
    company_owner: cid,
    created_by: uid
  }
  const { status, result, message } = await JobMap.createJob(data)

  res.send({ status, result, message })
}

async function save(req, res) {
  const { position, job_type, duty, performance, welfare, salary_type, salary_min, salary_max, work_days, work_timestart, work_timeend, sub_area, area, country, require, id } = req.body
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
    require: require,
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
  listByCompany,
  add,
  save,
  remove
}