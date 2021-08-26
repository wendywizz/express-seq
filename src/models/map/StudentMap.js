const { Student, Province, District, User } = require("../orm");
const { Op } = require("sequelize");

async function getStudentByUserID(id) {
  let data = null, message = `User ID#${id} not found`,  error = null;

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
module.exports = {
  getStudentByUserID,
  identifyStudent,
};
