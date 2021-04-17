const { CompanyMap } = require("../models/map")

async function saveByOwner(req, res) {  
  const { owner } = req.body   
  const saveData = {
    company_name: req.body.name,
    about: req.body.about,
    address: req.body.address,
    province: req.body.province,
    district: req.body.district,
    postcode: req.body.postcode,
    phone: req.body.phone,
    email: req.body.email,
    website: req.body.website,
    facebook: req.body.facebook,
  }
  const { success, data, message, error } = await CompanyMap.saveByOwner(owner, saveData)
  res.send({ success, data, message, error })
}

async function getCompany(req, res) {
  const { id } = req.query

  const { data, message ,error } = await CompanyMap.getCompanyByPK(id)
  res.send({ data, message, error })
}

async function getInfoByOwner(req, res) {
  const { owner } = req.query

  const { data, message, error } = await CompanyMap.getCompanyByOwner(owner)
  res.send({ data, message, error })
}

module.exports = {  
  saveByOwner,
  getCompany,
  getInfoByOwner
}