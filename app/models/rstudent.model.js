module.exports = (sequelize, Sequelize) => {
  const RStudent = sequelize.define("rstudent", {
    STUD_ID: {
      type: Sequelize.STRING
    },
    STU_NAME: {
      type: Sequelize.STRING
    },
    STU_SNAME: {
      type: Sequelize.STRING
    },
  })

  return RStudent;
}