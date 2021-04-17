module.exports = (app) => {
  const router = require("express").Router()
  const companyCtrl = require("../controllers/CompanyController")
  
  /* Need authentication */    
  router.get("/view", companyCtrl.getCompany)
  router.get("/info-owner", companyCtrl.getInfoByOwner)
  router.post("/save-owner", companyCtrl.saveByOwner)

  app.use("/api/company", router)
}