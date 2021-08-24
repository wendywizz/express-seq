const { UserMap } = require("../models/map");
const jwt = require("jsonwebtoken")
const jwtSecret = "jwtsecret"

async function signInByEmail(req, res) {
  const { email, password } = req.body
  const { success, data, message } = await UserMap.signInByEmail(email, password)
  let authSuccess = false, respData = {}, respToken = null

  if (success) {
    const id = data.id
    const token = jwt.sign({id}, jwtSecret, {
      expiresIn: 300
    })

    req.session.user = data
    
    authSuccess = true
    respData = data
    respToken = token
  }

  res.send({ success: authSuccess, data: respData, token: respToken, message })
}

async function signOut(req, res) {
  req.session.destroy(() => {
    req.logout()

    res.send({ success: true, message: "Signout completed"})
  })
}

async function userInfo(req, res) {
  let authSuccess = false, respData = {}, respMessage = 'No userdata'

  const id = req.id  
  const { data } = await UserMap.getUserByPK(id)
  const user = data.dataValues
  
  if (user) {    
    authSuccess = true
    respMessage = 'Verified user'
    respData = {
      id: user.user_id,
      type: user.user_type,
      student_code: user.student_code
    }
  }

  res.send({ 
    success: authSuccess, 
    message: respMessage,
    data: respData
  })
}

module.exports = {
  signInByEmail,
  signOut,
  userInfo
}