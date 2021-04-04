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
console.log("SAVE", saveData)
  const { status, data, message, error } = await CompanyMap.saveByOwner(owner, saveData)
  res.send({ status, data, message, error })
}

async function getInfoByOwner(req, res) {
  const { owner } = req.query

  const { status, data, message } = await CompanyMap.getCompanyByOwner(owner)
  res.send({ status, data, message })
}

module.exports = {  
  saveByOwner,
  getInfoByOwner
}