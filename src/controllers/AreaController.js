const { AreaMap } = require("../models/map")

async function getProvince(req, res) {
  const { data, itemCount, message, error } = await AreaMap.getProvince()

  res.send({ data, itemCount, message, error })
}

async function getDistrictByProvince(req, res) {
  const { id } = req.query
  const { data, itemCount, message, error } = await AreaMap.getDistrictByProvince(id)

  res.send({ data, itemCount, message, error })
}

module.exports = {
  getProvince,
  getDistrictByProvince
}