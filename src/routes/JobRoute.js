module.exports = (app) => {
  const router = require("express").Router()
  const jobCtrl = require("../controllers/JobController")

  router.get("/view", jobCtrl.view)
  router.get("/search", jobCtrl.search)
  
  /* Need authentication */  
  router.get("/gettype", jobCtrl.getJobType)
  router.post("/add", jobCtrl.add)
  router.post("/save", jobCtrl.save)
  router.post("/remove", jobCtrl.remove)

  app.use("/api/job", router)
}