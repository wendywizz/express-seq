module.exports = (app) => {
  const router = require("express").Router()
  const companyCtrl = require("../controllers/CompanyController")
  
  /* Need authentication */    
  router.post("/info", companyCtrl.getInfo)
  router.post("/save", companyCtrl.save)
  router.post("/job", companyCtrl.getJob)

  app.use("/api/company", router)
}