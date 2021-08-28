const { StudentMap, UserMap } = require("../models/map");

async function identifyStudent(req, res) {
  const { std_code, person_no } = req.body
  const { success, message, error } = await StudentMap.identifyStudent(std_code, person_no);
  
  res.send({ success, message, error });
}

async function registerApplicantWithEmail(req, res) {
  const body = req.body;
  const data = {    
    student_code: body.std_code,
    person_no: body.person_no,
    email: body.email,
    password: body.password,
  }
  const { success, message, error } = await UserMap.registerApplicantWithEmail(data);
  
  res.send({ success, message, error });
}

async function registerEmployerWithEmail(req, res) {
  const body = req.body;
  const data = {    
    company_name: body.company_name,
    email: body.email,
    password: body.password,
  }
  const { success, message, error } = await UserMap.registerEmployerWithEmail(data);
  
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
  registerEmployerWithEmail,
  activateUser
}