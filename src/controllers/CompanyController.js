const { CompanyMap } = require("../models/map")

async function save(req, res) {  
  const { cid } = req.body   
  
  const { status, result, message } = CompanyMap.save(cid ,data)
  res.send({ status, result, message })
}

async function getInfo(req, res) {
  const { cid } = req.body

  const { status, result, message } = CompanyMap.getCompanyByOwner(cid)
  res.send({ status, result, message })
}

async function getJob(req, res) {
  const { id } = req.body
  const { status, result, itemCount, message } = await CompanyMap.getJobOfCompany(id)

  res.send({ status, result, message, itemCount })
}

module.exports = {  
  save,
  getInfo,
  getJob
}