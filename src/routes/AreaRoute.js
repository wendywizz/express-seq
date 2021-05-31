module.exports = (app) => {
  const router = require("express").Router()
  const areaCtrl = require("../controllers/AreaController")

  router.get("/list_province", areaCtrl.listProvince)
  router.get("/list_district", areaCtrl.listDistrictByProvince)
  router.get("/province", areaCtrl.listProvinceByPk)
  router.get("/district", areaCtrl.getDistrictByPk)

  app.use("/api/area", router)
}