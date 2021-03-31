module.exports = (app) => {
  const router = require("express").Router()
  const jobCtrl = require("../controllers/JobController")

  router.get("/view", jobCtrl.view)
  router.get("/search", jobCtrl.search)
  router.post("/company", jobCtrl.getJobOfCompany)
  
  /* Need authentication */  
  router.get("/job-type", jobCtrl.getJobType)
  router.get("/salary-type", jobCtrl.getSalaryType)
  router.post("/add", jobCtrl.add)
  router.post("/save", jobCtrl.save)
  router.post("/remove", jobCtrl.remove)

  app.use("/api/job", router)
}