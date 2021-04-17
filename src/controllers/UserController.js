const { UserMap } = require("../models/map");

async function getUserByUserCode(req, res) {
  const { code } = req.query
  const { data, message, error } = await UserMap.getUserByUserCode(code)

  res.send({ data, message, error })
}

async function getUserType(req, res) {
  const { code } = req.query
  const { data, message, error } = await UserMap.getUserTypeByUserCode(code)

  res.send({ data, message, error })
}

module.exports = {
  getUserByUserCode,
  getUserType
}