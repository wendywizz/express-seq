const { ApplyMap } = require("../models/map")

async function add(req, res) {
  const { job, resume, user } = req.body;

  const newData = {
    job_id: job,
    apply_greeting: greeting,
    resume_id: resume,
    created_by: user,
  };
  const { success, data, message, error } = await ApplyMap.applyResume(newData);

  res.send({ success, data, message, error });
}

module.exports = {
  add
}