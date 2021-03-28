const { RStudent } = require("../orm")
const { Op } = require("sequelize")

async function identifyStudent(studentCode, cardNo) {
  let status = 0, message = "Student data not found"
  const conditions = {
    CARD_ID: {
      [Op.eq]: cardNo
    },
    STUD_ID: {
      [Op.eq]: studentCode
    }
  };
  await RStudent.count({ where: conditions })
    .then(rowCount => {
      if (rowCount > 0) {
        status = 1
        message = `Student code#${studentCode} is available`
      }
    })
    .catch(error => {
      message = error.message
    })

  return { status, message }
}
module.exports = {
  identifyStudent
}