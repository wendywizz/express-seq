const { RStudent } = require("../orm")
const { Op } = require("sequelize")

async function identifyStudent(studentCode, cardNo) {
  const conditions = {
    CARD_ID: {
      [Op.eq]: cardNo
    },
    STUD_ID: {
      [Op.eq]: studentCode
    }
  };
  return await RStudent.count({ where: conditions }).then(rowCount => {
    if (rowCount > 0) {
      return {
        status: 1,
        message: `Student code#${studentCode} is available`
      };
    } else {
      return {
        status: 0,
        message: `Student data not found`
      }
    }
  }).catch(error => {
    return {
      status: 0,
      message: error.message
    }
  })
}
module.exports = {
  identifyStudent
}