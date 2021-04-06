module.exports = (app) => {
  const router = require("express").Router()
  const authenCtrl = require("../controllers/AuthenController")

  router.post("/signin", authenCtrl.signInByEmail)

  app.use("/api/authen", router)
}