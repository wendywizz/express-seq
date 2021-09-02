const { ApplyMap } = require("../models/map")

async function add(req, res) {
  const { job, resume, user, greeting } = req.body;

  const newData = {
    job_id: job,
    apply_greeting: greeting,
    resume_id: resume,
    created_by: user,
  };
  const { success, data, message, error } = await ApplyMap.applyResume(newData);

  res.send({ success, data, message, error });
}

async function checkApplied(req, res) {
  const { job, user } = req.query;

  const isApplied = await ApplyMap.checkAppliedByUser(job, user);
  res.send({ applied: isApplied })
}

module.exports = {
  add,
  checkApplied
}