const { CompanyMap } = require("../models/map")

async function edit(req, res) {
  const { id } = req.query
  const { status, result, message } = CompanyMap.getCompanyByOwner(id)

  res.send({ status, result, message })
}

async function save(req, res) {  
  const { cid } = req.body   
  
  const { status, result, message } = CompanyMap.save(cid ,data)
  res.send({ status, result, message })
}

module.exports = {
  edit,
  save
}