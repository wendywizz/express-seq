const multer = require("multer")
const path = require("path")
const { UPLOAD_RESUME_PATH } = require("../config/path")

module.exports = (app) => {
  const router = require("express").Router()
  const resumeCtrl = require("../controllers/ResumeController")
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, UPLOAD_RESUME_PATH)
    },
    filename: (req, file, cb) => {
      const userId = req.body.user_id
      const fileName = `${userId}_${Date.now()}${path.extname(file.originalname)}`
      cb(null, fileName)
    }
  })
  const uploadResume = multer({ storage })

  router.post("/add", uploadResume.single('resume_file'), resumeCtrl.add)
  router.post("/remove", resumeCtrl.remove)

  app.use("/api/resume", router)
}