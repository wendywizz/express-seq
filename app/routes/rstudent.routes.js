module.exports = (app) => {
  const rstudent = require("../controllers/rstudent.controller");
  const router = require("express").Router();

  router.get("/", rstudent.findAll);

  app.use("/api/student", router);
}