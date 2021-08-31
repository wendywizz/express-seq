module.exports = (app) => {
  const router = require("express").Router();
  const multer = require("multer");
  const randomstring = require("randomstring");
  const path = require("path");
  const resumeCtrl = require("../controllers/ResumeController");
  const { UPLOAD_RESUME_PATH } = require("../config/path");

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, UPLOAD_RESUME_PATH);
    },
    filename: (req, file, cb) => {
      const fileName = `${Date.now()}-${randomstring.generate(10)}${path.extname(file.originalname)}`;

      cb(null, fileName);
    },
  });
  const uploadResume = multer({ storage });

  router.get("/list-by-user", resumeCtrl.listByUser);
  router.get("/view");
  router.post("/add", uploadResume.single("file"), resumeCtrl.add);
  router.post("/remove", resumeCtrl.remove);

  app.use("/api/resume", router);
};
