module.exports = (app) => {
  const router = require("express").Router()
  const userCtrl = require("../controllers/UserController")

  router.get("/type-by-code", userCtrl.getUserType)
  router.get("/user-by-code", userCtrl.getUserByUserCode)  

  app.use("/api/user", router)
}