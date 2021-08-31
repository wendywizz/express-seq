const { ResumeMap } = require("../models/map")

async function add(req, res) {
  const { user_id, name, additional } = req.body  
  const resumeFileName = req.file.filename
  const insertData = {
    name,
    additional,
    resume_file: resumeFileName,
    created_by: user_id
  }
  const { success, message, error } = await ResumeMap.createResume(insertData)

  res.send({ success, message, error })
}

async function remove(req, res) {
  const { id } = req.body

  const { success, message, error } = await ResumeMap.deleteResume(id)
  res.send({ success, message, error })
}

module.exports = {
  add,
  remove
}