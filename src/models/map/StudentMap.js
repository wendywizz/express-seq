const { RStudent } = require("../orm")
const { Op } = require("sequelize")

async function identifyStudent(studentCode, cardNo) {
  let success = false, message = "Student data not found", error = null

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
        success = true
        message = `Student code#${studentCode} is available`
      } else {
        message = `Student code#${studentcode} already registrated`
      }
    })
    .catch(e => {
      error = e.message
    })

  return { success, message, error }
}
module.exports = {
  identifyStudent
}