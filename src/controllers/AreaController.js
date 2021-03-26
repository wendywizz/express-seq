const { AreaMap } = require("../models/map")

async function getProvince(req, res) {
  const { status, result, message } = await AreaMap.getProvince()

  res.send({ status, result, message })
}

async function getDistrictByProvince(req, res) {
  const { id } = req.query
  const { status, result, message } = await AreaMap.getDistrictByProvince(id)

  res.send({ status, result, message })
}

module.exports = {
  getProvince,
  getDistrictByProvince
}