const { User } = require("../orm");
const { Op } = require("sequelize");
const { getBaseDataStudentByCode, insertStudent } = require("./StudentMap");

async function signInByEmail(email, password) {
  let success = false, data = null, message = "Login failed", error = null
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
  await User.findOne({ where: conditions })
    .then(row => {
      if (row) {
        success = true
        data = {
          id: row.user_id,
          student_code: row.student_code,
          type: row.user_type
        }
        message = "Login successed"
      }
    })
    .catch(e => {
      error = e.message
    })

  return { success, data, message, error }
}

async function checkIfStudentRegistered(studentCode) {
  let success = false, message = `User code#${studentCode} is not register`, error = null

  const conditions = {
    student_code: {
      [Op.eq]: studentCode
    }
  };
  await User.count({ where: conditions })
    .then(rowCount => {
      if (rowCount > 0) {
        success = true
        message = `User code#${studentCode} registered`
      }
    })
    .catch(e => {
      error = e.message
    });

  return { success, message, error }
}

async function checkIfEmailExist(email) {
  let success = false, message = `Email ${email} not found`, error = null
  const conditions = {
    email: {
      [Op.eq]: email
    }
  }
  await User.count({ where: conditions })
    .then(rowCount => {
      if (rowCount > 0) {
        success = true,
          message = `Email ${email} is already registrated`
      }
    })
    .catch(e => {
      error = e.message
    })

  return { success, message, error }
}

async function getUserByPK(id) {
  let data = null, message = `Not found`, error = null

  const conditions = {
    user_id: {
      [Op.eq]: id
    }
  };
  await User.findOne({
    where: conditions
  }).then(row => {
    data = row
    message = "Found"
  }).catch(e => {
    error = e.message
  })

  return { data, message, error }
}

async function registerApplicantWithEmail(registData) {
  const studentCode = registData.student_code
  const email = registData.email
  let resp = null

  // Check if student code registrated
  resp = await checkIfStudentRegistered(studentCode)
  if (resp.success) {
    return {
      success: false,
      message: resp.message,
      error: resp.error
    }
  }
  // Check duplicate email
  resp = await checkIfEmailExist(email)
  if (resp.success) {
    return {
      success: false,
      message: resp.message,
      error: resp.error
    }
  }

  if (!resp.success) {
    const { data } = await getBaseDataStudentByCode(studentCode)
    const bdStudent = data.dataValues    

    if (bdStudent) {
      // Create New User
      return await User.create(registData)
        .then(async (result) => {          
          const insertId = result.dataValues.user_id          
          const insertData = {
            student_code: bdStudent.STUD_ID,
            first_name: bdStudent.STU_NAME,
            last_name: bdStudent.STU_SNAME,
            email,
            created_by: insertId
          }          
          await insertStudent(insertData)
          
          return {
            success: true,
            message: "Registration completed",
            error: null
          }        
        })
        .catch(e => {
          return {
            success: false,
            message: "Registration failed",
            error: e.message
          }
        })
    }
  }

  return {
    success: false,
    message: "Registration failed",
    error: null
  }
}

async function activateUserByID(id) {
  let success = false, message = "Activate failed", error = null

  User.update({ active: true }, {
    where: { user_id: id }
  }).then(() => {
    success = true
    message = "Activate successed"
  }).catch(error => {
    error = error.message
  });

  return { success, message, error }
}

module.exports = {
  signInByEmail,
  checkIfStudentRegistered,
  registerApplicantWithEmail,
  getUserByPK,
  activateUserByID,  
}