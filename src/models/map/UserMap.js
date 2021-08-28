const { User, Student } = require("../orm");
const { Op } = require("sequelize");
const { getBaseDataStudentByCode, createStudent } = require("./StudentMap");
const { createCompany } = require("./CompanyMap");
const { currentDateTime } = require("../../utils/DateTime");
const { employerType, applicantType } = require("../../constants/UserType")

async function signInByEmail(email, password) {
  let success = false,
    data = null,
    message = "Login failed",
    error = null;
  const conditions = {
    email: {
      [Op.eq]: email,
    },
    password: {
      [Op.eq]: password,
    },
    active: {
      [Op.eq]: true,
    },
  };
  await User.findOne({ where: conditions })
    .then((row) => {
      if (row) {
        success = true;
        data = {
          id: row.user_id,
          student_code: row.student_code,
          type: row.user_type,
        };
        message = "Login successed";
      }
    })
    .catch((e) => {
      error = e.message;
    });

  return { success, data, message, error };
}

async function checkIfStudentRegistered(studentCode) {
  let isRegistered = false;

  const conditions = {
    student_code: {
      [Op.eq]: studentCode,
    },
  };
  await Student.count({ where: conditions }).then((rowCount) => {
    if (rowCount > 0) {
      isRegistered = true;
    }
  });

  return isRegistered;
}

async function checkIfEmailExist(email) {
  let isExist = false;

  const conditions = {
    email: {
      [Op.eq]: email,
    },
  };
  await User.count({ where: conditions }).then((rowCount) => {
    if (rowCount > 0) {
      isExist = true;
    }
  });

  return isExist;
}

async function getUserByPK(id) {
  let data = null,
    message = `User ID#${id} not found`,
    error = null;

  const conditions = {
    user_id: {
      [Op.eq]: id,
    },
  };
  await User.findOne({
    where: conditions,
  })
    .then((row) => {
      data = row;
      message = `User ID#${id} found`;
    })
    .catch((e) => {
      error = e.message;
    });

  return { data, message, error };
}

async function createUser(data) {
  let insertId = null,
    success = false,
    message = "Registration failed",
    error;
  const insertData = {
    ...data,
    created_by: currentDateTime(),
    created_at: currentDateTime(),
  };

  await User.create(insertData)
    .then(async (result) => {
      const id = result.dataValues.user_id;

      success = true;
      insertId = id;
      message = "Registration completed";
    })
    .catch((e) => {
      error = e.message;
    });

  return { insertId, success, message, error };
}

async function registerEmployerWithEmail(registData) {
  let respSuccess = false,
    respMessage,
    respError;

  if (registData) {
    const companyName = registData.company_name,
      email = registData.email;
    let isVerify = true;

    // Check duplicate email
    const isExist = await checkIfEmailExist(email);
    if (isExist) {
      isVerify = false;

      return {
        success: respSuccess,
        message: `Email ${email} is already registered`,
      };
    }

    // Create user
    if (isVerify) {
      // Insert data to 'user' table
      registData.user_type = employerType
      const { insertId, success, message, error } = await createUser(registData);
      const studentData = {
        company_name: companyName,
        email,
      };
      // Insert data to 'student' table
      await createCompany(insertId, studentData);

      respSuccess = success;
      respMessage = message;
      respError = error;
    }
  }

  return {
    success: respSuccess,
    message: respMessage,
    error: respError,
  };
}

async function registerApplicantWithEmail(registData) {
  let respSuccess = false,
    respMessage,
    respError;

  if (registData) {
    const studentCode = registData.student_code,
      email = registData.email;
    let isVerify = true;

    // Check if student code registrated
    const isRegistered = await checkIfStudentRegistered(studentCode);
    if (isRegistered) {
      isVerify = false;

      return {
        success: respSuccess,
        message: `Student code ${studentCode} is already registered`,
      };
    }
    // Check duplicate email
    const isExist = await checkIfEmailExist(email);
    if (isExist) {
      isVerify = false;

      return {
        success: respSuccess,
        message: `Email ${email} is already registered`,
      };
    }

    // Create user
    if (isVerify) {
      const { data } = await getBaseDataStudentByCode(studentCode);
      const bdStudent = data.dataValues;

      if (bdStudent) {
        // Insert data to 'user' table
        registData.user_type = applicantType
        const { insertId, success, message, error } = await createUser(registData);
        const studentData = {
          student_code: bdStudent.STUD_ID,
          first_name: bdStudent.STU_NAME,
          last_name: bdStudent.STU_SNAME,
          email,
        };
        // Insert data to 'student' table
        await createStudent(insertId, studentData);

        respSuccess = success;
        respMessage = message;
        respError = error;
      } else {
        respMessage = `No student code#${studentCode} found`;
      }
    }
  }

  return {
    success: respSuccess,
    message: respMessage,
    error: respError,
  };
}

async function activateUserByID(id) {
  let success = false,
    message = "Activate failed",
    error = null;

  User.update(
    { active: true },
    {
      where: { user_id: id },
    }
  )
    .then(() => {
      success = true;
      message = "Activate successed";
    })
    .catch((error) => {
      error = error.message;
    });

  return { success, message, error };
}

module.exports = {
  signInByEmail,
  registerApplicantWithEmail,
  registerEmployerWithEmail,
  getUserByPK,
  activateUserByID,
};
