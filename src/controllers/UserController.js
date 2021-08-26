const { StudentMap } = require("../models/map");

async function getStudentInfo(req, res) {
  const { id } = req.query  
  const { data, message, error } = await StudentMap.getStudentByUserID(id)

  res.send({ data, message, error })
}

module.exports = {
  getStudentInfo
}