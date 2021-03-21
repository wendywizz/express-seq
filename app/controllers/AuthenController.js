const { UserMap } = require("../models/map");
const { credential, verifyToken } = require("../models/OAuth2")

async function signInByEmail(req, res) {
  const { email, password } = req.body
  const { status, result, message } = await UserMap.signInByEmail(email, password)
  let accessToken = null

  if (status) {
    const userType = result.type
    const { access_token } = await credential(userType);
    accessToken = access_token
  }
  
  res.send({ status, accessToken, message, result })
}

async function checkSession(req, res) {
  const { access_token } = req.query
  const result = await verifyToken(access_token)

  res.send({result})
}

module.exports = {
  signInByEmail,
  checkSession
}