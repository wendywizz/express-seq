const { AreaMap } = require("../models/map")

async function listProvince(req, res) {
  const { data, itemCount, message, error } = await AreaMap.listProvince()

  res.send({ data, itemCount, message, error })
}

async function listDistrictByProvince(req, res) {
  const { id } = req.query
  const { data, itemCount, message, error } = await AreaMap.listDistrictByProvince(id)

  res.send({ data, itemCount, message, error })
}

async function listProvinceByPk(req, res) {
  const { id } = req.query
  const { data, message, error } = await AreaMap.listProvinceByPk(id)

  res.send({ data, message, error })
}

async function getDistrictByPk(req, res) {
  const { id } = req.query
  const { data, message, error } = await AreaMap.getDistrictByPk(id)

  res.send({ data, message, error })
}

module.exports = {
  listProvince,
  listDistrictByProvince,
  listProvinceByPk,
  getDistrictByPk
}