const { AreaMap } = require("../models/map")

async function getProvince(req, res) {
  const { success, data, itemCount, message, error } = await AreaMap.getProvince()

  res.send({ success, data, itemCount, message, error })
}

async function getDistrictByProvince(req, res) {
  const { id } = req.query
  const { success, data, itemCount, message, error } = await AreaMap.getDistrictByProvince(id)

  res.send({ success, data, itemCount, message, error })
}

module.exports = {
  getProvince,
  getDistrictByProvince
}