const orm = require("../orm");
const { Op } = require("sequelize");

async function signInByEmail(email, password) {
  let status = 0, data = null, message = "Login failed"
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
  await orm.User.findOne({ where: conditions })
    .then(row => {
      if (row) {
        status = 1
        data = {
          id: row.user_id,
          student_code: row.student_code,
          type: row.user_type
        }
        message = "Login successed"
      }
    })
    .catch(error => {
      message = error.message
    })

  return { status, data, message }
}

async function checkIfStudentRegistered(studentCode) {
  let status = 0, message = `User code#${studentCode} is not register`

  const conditions = {
    student_code: {
      [Op.eq]: studentCode
    }
  };
  await orm.User.count({ where: conditions })
    .then(rowCount => {
      if (rowCount > 0) {
        status = 1
        message = `User code#${studentCode} registered`
      }
    })
    .catch(error => {
      message = error.message
    });

  return { status, message }
}

async function checkIfEmailExist(email) {
  let status = 0, message = `Email ${email} not found`
  const conditions = {
    email: {
      [Op.eq]: email
    }
  }
  await orm.User.count({ where: conditions })
    .then(rowCount => {
      if (rowCount > 0) {
        status = 1,
          message = `Email ${email} is already registrated`
      }
    })
    .catch(error => {
      message = error.message
    })

  return { status, message }
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
    return await orm.User.create(data)
      .then(() => {
        return {
          status: 1,
          message: "Registration is complete"
        }
      })
      .catch(error => {
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