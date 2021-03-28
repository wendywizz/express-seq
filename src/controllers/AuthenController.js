const { UserMap } = require("../models/map");
const { credential, verifyToken } = require("../models/OAuth2")

async function signInByEmail(req, res) {
  const { email, password } = req.body
  const { status, data, message } = await UserMap.signInByEmail(email, password)
  let accessToken = null

  if (status) {
    const userType = data.type
    const { access_token } = await credential(userType);
    accessToken = access_token
  }
  
  res.send({ status, accessToken, message, data })
}

async function checkSession(req, res) {
  const { access_token } = req.query
  const data = await verifyToken(access_token)

  res.send({data})
}

module.exports = {
  signInByEmail,
  checkSession
}