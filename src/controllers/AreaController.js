const { AreaMap } = require("../models/map")

async function getProvince(req, res) {
  const { status, data, itemCount, message } = await AreaMap.getProvince()

  res.send({ status, data, itemCount, message })
}

async function getDistrictByProvince(req, res) {
  const { id } = req.query
  const { status, data, itemCount, message } = await AreaMap.getDistrictByProvince(id)

  res.send({ status, data, itemCount, message })
}

module.exports = {
  getProvince,
  getDistrictByProvince
}