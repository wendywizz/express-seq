const { ResumeMap } = require("../models/map")

async function add(req, res) {
  const { user_id, name, file, additional } = req.body

  const { success, message, error } = ResumeMap.createResume()
  res.send({ success, message, error })
}

async function remove(req, res) {
  const { id } = req.body

  const { success, message, error } = ResumeMap.deleteResume(id)
  res.send({ success, message, error })
}

module.exports = {
  add,
  remove
}