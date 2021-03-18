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
      return {
        status: 1,
        message: `User code#${studentCode} exist`
      }
    } else {
      return {
        status: 0,
        message: `User code#${studentCode} doesn't exist`
      }
    }
  }).catch(error => {
    return {
      status: -1,
      message: error.message
    };
  });
}

async function checkIfEmailExist(email) {
  const conditions = {
    email: {
      [Op.eq]: email
    }
  }
}

async function registerApplicantWithEmail(data) {
  // Check if user already registered
  const studentCode = data.student_code;
  const { status, message } = await checkIfStudentRegistered(studentCode);
  if (!status) {
    // Create New User
    return await orm.User.create(data).then(() => {
      return {
        status: 1,
        message: "Registration is complete"
      }
    }).catch(error => {
      return {
        status: 0,
        message: error.message
      }
    })
  } else {
    return {
      status: -1,
      message
    }
  }
}

async function activateUserByID(id) {
  return orm.User.update({ 
    active: true 
  }, { 
    where: { user_id: id } 
  }).then(() => {
    return {
      status: 1,
      message: "Success"
    }
  }).catch(error => {
    return {
      status: 0,
      message: error.message
    }
  });
}

module.exports = {
  checkIfStudentRegistered,
  registerApplicantWithEmail,
  activateUserByID
}