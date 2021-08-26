module.exports = (app) => {
  const router = require("express").Router()
  const userCtrl = require("../controllers/UserController")

  router.get("/student-info", userCtrl.getStudentInfo)

  app.use("/api/user", router)
}