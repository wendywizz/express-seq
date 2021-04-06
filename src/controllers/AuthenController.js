const { UserMap } = require("../models/map");

async function signInByEmail(req, res) {
  const { email, password } = req.body
  const { success, data, message, error } = await UserMap.signInByEmail(email, password)
  
  res.send({ success, message, data, error })
}

async function getUserType(req, res) {
  const { code } = req.query
  const { success, data, message, error } = await UserMap.getUserTypeByUserCode(code)

  res.send({ success, message, data, error })
}

module.exports = {
  signInByEmail,
  getUserType
}