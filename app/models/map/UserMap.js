const orm = require("../orm");
const { Op } = require("sequelize");

async function checkIfStudentRegistered(studentCode) {
  const conditions = {
    student_code: {
      [Op.eq]: studentCode
    }
  };
  return await orm.User.count({ where: conditions }).then(rowCount => {
    if (rowCount > 0) {
      return true;
    } else {
      return false;
    }
  }).catch(() => {
    return false;
  });
}

async function registerApplicantWithEmail(data) {
  // Check if user already registered
  const studentCode = data.student_code;
  const exist = await checkIfStudentRegistered(studentCode);
  if (!exist) {
    // Create New User
    return await orm.User.create(data).then(() => {
      return {
        result: 1,
        message: "Registration is complete"
      }
    }).catch(error => {
      return {
        result: 0,
        message: error.message
      }
    })
  } else {
    return {
      result: -1,
      message: "User already exist"
    }
  }
}

async function activateUserByID(id) {
  return orm.User.update({ 
    active: true 
  }, { 
    where: { user_id: id } 
  }).then(() => {
    return true;
  }).catch(() => {
    return false;
  });
}

module.exports = {
  checkIfStudentRegistered,
  registerApplicantWithEmail,
  activateUserByID
}