const { CompanyMap } = require("../models/map")

async function save(req, res) {  
  const { cid } = req.body   
  
  const { status, data, message } = CompanyMap.save(cid ,data)
  res.send({ status, data, message })
}

async function getInfo(req, res) {
  const { cid } = req.body

  const { status, data, message } = CompanyMap.getCompanyByOwner(cid)
  res.send({ status, data, message })
}

module.exports = {  
  save,
  getInfo
}