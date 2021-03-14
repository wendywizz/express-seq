module.exports = (app) => {
  const router = require("express").Router();
  const registerCtrl = require("../controllers/RegisterController");

  router.post("/identify-student", registerCtrl.identifyStudent);
  router.post("/applicant/email", registerCtrl.registerApplicantWithEmail);

  app.use("/api/register", router);
}