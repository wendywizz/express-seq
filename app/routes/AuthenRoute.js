module.exports = (app) => {
  const router = require("express").Router()
  const authenCtrl = require("../controllers/AuthenController")

  router.post("/login", authenCtrl.loginByEmail)

  app.use("/api/authen", router)
}