module.exports = (app) => {
  const router = require("express").Router();
  const applyCtrl = require("../controllers/ApplyController");

  router.post("/add",  applyCtrl.add);

  app.use("/api/apply", router);
};
