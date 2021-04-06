const { RStudent } = require("../orm")
const { Op } = require("sequelize")

async function identifyStudent(studentCode, personNo) {
  let success = false, message = "Student data not found", error = null

  const conditions = {
    STUD_ID: {
      [Op.eq]: studentCode
    },
    CARD_ID: {
      [Op.eq]: personNo
    }
  };
  await RStudent.count({ where: conditions })
    .then(rowCount => {
      if (rowCount > 0) {
        success = true
        message = `Student code#${studentCode} is available`
      } else {
        message = `Student code#${studentCode} already registrated`
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