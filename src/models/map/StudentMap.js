const { Student, RStudent, Province, District, User } = require("../orm");
const { Op } = require("sequelize");
const { currentDateTime } = require("../../utils/DateTime");

async function getStudentByUserID(id) {
  let data = null, message = `User ID#${id} not found`, error = null;

  const conditions = {
    created_by: {
      [Op.eq]: id,
    },
  };
  await Student.findOne({
    where: conditions,
    include: [
      { model: Province, as: "province_asso" },
      { model: District, as: "district_asso" },
      { model: User, as: "user_asso" }
    ]
  })
    .then(result => {
      data = result
      message = `User ID#${id} found`;
    })
    .catch((e) => {
      error = e.message;
    });

  return { data, message, error };
}

async function identifyStudent(studentCode, personNo) {
  let success = false,
    message = "Student data not found",
    error = null;

  const conditions = {
    STUD_ID: {
      [Op.eq]: studentCode,
    },
    CARD_ID: {
      [Op.eq]: personNo,
    },
  };
  await RStudent.count({ where: conditions })
    .then((rowCount) => {
      if (rowCount > 0) {
        success = true;
        message = `Student code#${studentCode} is available`;
      } else {
        message = `Student code#${studentCode} already registrated`;
      }
    })
    .catch((e) => {
      error = e.message;
    });

  return { success, message, error };
}

async function saveStudentByUserId(userId, data) {
  let success = false, returnData = null, message = `Save student#${userId} falied`, error = null
  const updateData = {
    ...data,
    updated_at: currentDateTime()
  }
  const conditions = {
    created_by: {
      [Op.eq]: userId
    }
  }

  await Student.update(updateData, { where: conditions })
    .then(async () => {      
      const { data } = await getStudentByUserID(userId)

      returnData = data
      success = true
      message = `Save student#${userId} successed`
    })
    .catch(e => {
      error = e.message
    })

  return { success, data: returnData, message, error }
}

async function insertStudent(data) {
  let success = false, message = 'Add new student failed', error = null
  const insertData = {
    ...data,
    created_at: currentDateTime()
  }

  await Student.create(insertData)
    .then(() => {
      success = true
      message = 'Add new student successed'
    })
    .catch(e => {
      error = e.message
    })

  return { success, message, error }
}

async function getBaseDataStudentByCode(studentCode) {
  let returnData = null, message = "Student data not found", error = null;

  const conditions = {
    STUD_ID: {
      [Op.eq]: studentCode,
    }
  };
  await RStudent.findOne({ where: conditions })
    .then((result) => {
      returnData = result
      message = `Student code#${studentCode} founded`
    })
    .catch((e) => {
      error = e.message;
    });

  return { data: returnData, message, error };
}

module.exports = {
  getStudentByUserID,
  getBaseDataStudentByCode,
  identifyStudent,
  saveStudentByUserId,
  insertStudent
};
