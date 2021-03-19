const { UserMap } = require("../models/map");
const { credential } = require("../models/OAuth2")

async function loginByEmail(req, res) {
  const { email, password } = req.body
  const { status, result, message } = await UserMap.authenUserByEmail(email, password)
  let accessToken = null

  if (status) {
    const userType = result.type
    const { access_token } = await credential(userType);
    accessToken = access_token
  }
  
  res.send({ status, accessToken, message })
}

module.exports = {
  loginByEmail
}