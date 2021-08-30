const multer = require("multer")
const path = require("path")
const { UPLOAD_COMPANY_LOGO_PATH } = require("../config/path")

module.exports = (app) => {
  const router = require("express").Router()
  const companyCtrl = require("../controllers/CompanyController")
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, UPLOAD_COMPANY_LOGO_PATH)
    },
    filename: (req, file, cb) => {      
      const fileName = `${Date.now()}${path.extname(file.originalname)}`
      cb(null, fileName)
    }
  });
  const uploadLogo = multer({ storage })

  /* Need authentication */
  router.get("/view", companyCtrl.getCompany)
  router.get("/info-owner", companyCtrl.getInfoByOwner)
  router.post("/save-owner", companyCtrl.saveByOwner)
  router.post("/upload-logo", uploadLogo.single('logo_file'), companyCtrl.uploadLogo)

  app.use("/api/company", router)
}