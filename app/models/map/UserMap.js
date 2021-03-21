const orm = require("../orm");
const { Op } = require("sequelize");

async function signInByEmail(email, password) {
  const conditions = {
    email: {
      [Op.eq]: email
    },
    password: {
      [Op.eq]: password
    },
    active: {
      [Op.eq]: true
    }
  }
  return await orm.User.findOne({where: conditions}).then(data => {
    let status = 0, result = null, message = "Login failed"
    if (data) {
      status = 1
      result = {
        id: data.user_id,
        student_code: data.student_code,
        type: data.user_type
      }
      message = "Login successed"
    }
    return { status, result ,message}
  }).catch(error => {
    return {
      status: 0,
      result: null,
      message: error.message
    }
  })
}

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
        message: `User code#${studentCode} registered`
      }
    } else {
      return {
        status: 0,
        message: `User code#${studentCode} is not register`
      }
    }
  }).catch(error => {
    return {
      status: 0,
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
  return await orm.User.count({ where: conditions }).then(rowCount => {
    if (rowCount > 0) {
      return {
        status: 1,
        message: `Email ${email} is already registrated`
      }
    } else {
      return {
        status: 0,
        message: `Email ${email} not found`
      }
    }
  }).catch(error => {
    return {
      status: 0,
      message: error.message
    }
  })
}

async function registerApplicantWithEmail(data) {  
  const studentCode = data.student_code
  const email = data.email
  let resp = null

  // Check if student code registrated
  resp = await checkIfStudentRegistered(studentCode)
  if (resp.status) {
    return { 
      status: 0, 
      message: resp.message 
    }
  }
  // Check duplicate email
  resp = await checkIfEmailExist(email)
  if (resp.status) {
    return { 
      status: 0, 
      message: resp.message 
    }
  }
  
  if (!resp.status) {
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
  signInByEmail,
  checkIfStudentRegistered,
  registerApplicantWithEmail,
  activateUserByID
}