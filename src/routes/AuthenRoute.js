module.exports = (app) => {
  const router = require("express").Router()
  const authenCtrl = require("../controllers/AuthenController")
  const jwt = require("jsonwebtoken")
  const jwtSecret = "jwtsecret"
  
  const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]
  
    if (!token) {    
      res.json({ success: false, message: 'No Access Token' })
    } else {
      jwt.verify(token, jwtSecret, (err, decoded) => {        
        if (err) {        
          res.json({ success: false, message: err.message })
        } else {
          rSuccess = true
          req.id = decoded.id
          
          next()
        }
      })
    }
  }

  router.get("/user-info", verifyJWT, authenCtrl.userInfo)
  router.post("/signin", authenCtrl.signInByEmail)  

  app.use("/api/authen", router)
}