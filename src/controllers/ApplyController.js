const { ApplyMap } = require("../models/map")

async function add(req, res) {
  const { job, resume, user, greeting } = req.body;

  const newData = {
    job_id: job,
    apply_greeting: greeting,
    resume_id: resume,
    created_by: user,
  };

  const response = await ApplyMap.applyResume(newData);
  res.send(response);
}

async function checkApplied(req, res) {
  const { job, user } = req.query;

  const isApplied = await ApplyMap.checkAppliedByUser(job, user);
  res.send({ applied: isApplied })
}

async function listApplying(req, res) {
  const { user, status } = req.query

  const response = await ApplyMap.listApplyingByUser(user, status)
  res.send(response)
}

module.exports = {
  add,
  checkApplied,
  listApplying
}