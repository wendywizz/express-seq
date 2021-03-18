const { StudentMap, UserMap } = require("../models/map");
const { applicant, employer } = require("../constants/UserType")
const dateTime = require("../utils/DateTime");

async function identifyStudent(req, res) {
  const body = req.body;
  const studentCode = body.std_code, cardNo = body.card_no;

  const { status, message } = await StudentMap.identifyStudent(studentCode, cardNo);
  
  res.send({ status, message });
}

async function registerApplicantWithEmail(req, res) {
  const body = req.body;
  const data = {
    user_type: applicant,
    email: body.email,
    password: body.password,
    student_code: body.std_code,
    person_id: body.person_id,
    created_at: dateTime.currentDateTime()
  }

  const { status, message } = await UserMap.registerApplicantWithEmail(data);
  
  res.send({ status, message });
}

async function activateUser(req, res) {
  const id = req.query.uid;

  const { status, message } = await UserMap.activateUserByID(id);
  
  res.send({ status, message });
}

module.exports = {
  identifyStudent,
  registerApplicantWithEmail,
  activateUser
}