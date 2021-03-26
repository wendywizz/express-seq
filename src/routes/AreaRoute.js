module.exports = (app) => {
  const router = require("express").Router()
  const areaCtrl = require("../controllers/AreaController")

  router.get("/province", areaCtrl.getProvince)
  router.get("/district", areaCtrl.getDistrictByProvince)

  app.use("/api/area", router)
}