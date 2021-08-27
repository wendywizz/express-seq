const { StudentMap } = require("../models/map");

async function getStudentInfo(req, res) {
  const { id } = req.query  
  const { data, message, error } = await StudentMap.getStudentByUserID(id)

  res.send({ data, message, error })
}

async function saveStudentInfo(req, res) {    
  const userId = req.body.user_id
  const saveData = {
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    address: req.body.address,
    province: req.body.province,
    district: req.body.district,
    postcode: req.body.postcode,
    phone: req.body.phone,
    email: req.body.email,    
    facebook: req.body.facebook,
  }
  const { success, data, message, error } = await StudentMap.saveStudentByUserId(userId, saveData)
  
  res.send({ success, data, message, error})
}

module.exports = {
  getStudentInfo,
  saveStudentInfo
}