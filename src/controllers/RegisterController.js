const { StudentMap, UserMap } = require("../models/map");
const { applicant, employer } = require("../constants/UserType")
const dateTime = require("../utils/DateTime");

async function identifyStudent(req, res) {
  const { std_code, person_no } = req.body
  const { success, message, error } = await StudentMap.identifyStudent(std_code, person_no);
  
  res.send({ success, message, error });
}

async function registerApplicantWithEmail(req, res) {
  const body = req.body;
  const data = {
    user_code: body.user_code,
    user_type: applicant,
    email: body.email,
    password: body.password,
    student_code: body.std_code,
    person_no: body.person_no,
    created_at: dateTime.currentDateTime()
  }
  const { success, message, error } = await UserMap.registerApplicantWithEmail(data);
  
  res.send({ success, message, error });
}

async function activateUser(req, res) {
  const id = req.query.uid;
  const { success, message, error } = await UserMap.activateUserByID(id);
  
  res.send({ success, message, error });
}

module.exports = {
  identifyStudent,
  registerApplicantWithEmail,
  activateUser
}