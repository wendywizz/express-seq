module.exports = (app) => {
  const router = require("express").Router();
  const applyCtrl = require("../controllers/ApplyController");

  router.post("/add",  applyCtrl.add);
  router.get("/check-applied", applyCtrl.checkApplied)
  router.get("/list-by-user", applyCtrl.listApplying)

  app.use("/api/apply", router);
};
