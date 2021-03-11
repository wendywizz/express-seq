module.exports = (app) => {
  const rstudent = require("../controllers/RStudentController");
  const router = require("express").Router();

  router.get("/", rstudent.findAll);
  router.get("/identify", rstudent.identifyStudent);

  app.use("/api/student", router);
}