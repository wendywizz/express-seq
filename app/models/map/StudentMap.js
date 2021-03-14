const orm = require("../orm");
const { Op } = require("sequelize");

async function identifyStudent(studentCode, cardNo) {
  const conditions = {
    CARD_ID: {
      [Op.eq]: cardNo
    },
    STUD_ID: {
      [Op.eq]: studentCode
    }
  };
  return await orm.RStudent.count({ where: conditions }).then(rowCount => {
    if (rowCount > 0) {
      return true;
    } else {
      return false;
    }
  });
}
module.exports = {
  identifyStudent
}