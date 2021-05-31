module.exports = (app) => {
  const router = require("express").Router()
  const jobCtrl = require("../controllers/JobController")

  router.get("/view", jobCtrl.view)
  router.get("/search", jobCtrl.search)
  router.post("/company", jobCtrl.getJobOfCompany)
  
  /* Need authentication */  
  router.get("/job-type", jobCtrl.getJobType)
  router.get("/job-category", jobCtrl.getJobCategory)
  router.get("/salary-type", jobCtrl.getSalaryType)
  router.get("/countall-active-job", jobCtrl.countAllActiveJob)
  router.post("/add", jobCtrl.add)
  router.post("/save", jobCtrl.save)
  router.post("/remove", jobCtrl.remove)
  router.post("/active", jobCtrl.setActive)

  app.use("/api/job", router)
}