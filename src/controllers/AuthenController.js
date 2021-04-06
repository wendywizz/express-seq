const { UserMap } = require("../models/map");

async function signInByEmail(req, res) {
  const { email, password } = req.body
  const { status, data, message } = await UserMap.signInByEmail(email, password)
  
  res.send({ status, message, data })
}

module.exports = {
  signInByEmail  
}