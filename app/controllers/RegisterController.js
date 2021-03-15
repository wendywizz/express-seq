const { StudentMap, UserMap } = require("../models/map");
const { applicant, employer } = require("../constants/UserType")
const dateTime = require("../utils/DateTime");

async function identifyStudent(req, res) {
  const body = req.body;
  const studentCode = body.std_code, cardNo = body.card_no;

  const pass = await StudentMap.identifyStudent(studentCode, cardNo);
  res.send({ pass });
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

  const result = await UserMap.registerApplicantWithEmail(data);
  let message = null;

  switch (result) {
    case 0: default:
      message = "Registration failed";
      break;
    case 1:
      message = "Registration successed";
      break;
    case -1:
      message = "Already registered";
      break;
  }
  res.send({ result, message });
}

async function activateUser(req, res) {
 const id = req.query.uid;

 const success = await UserMap.activateUserByID(id);
 let message = "Save failed", result = false;

 if (success) {
   message = "Save successed";
   result = true;
 }
 res.send({ result, message });
}

module.exports = {
  identifyStudent,
  registerApplicantWithEmail,
  activateUser
}