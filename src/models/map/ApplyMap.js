const { Apply } = require("../orm")
const { Op } = require("sequelize")
const { currentDateTime } = require("../../utils/DateTime")

async function applyResume(insertData) {
  let success = false, message = "Apply resume failed", error = null
  const newData = {
    created_at: currentDateTime(),
    ...insertData
  }

  await Apply.create(newData)
    .then(() => {
      success = true
      message = "Apply resume completed"
    })
    .catch(e => {
      error = e.message
    })

  return { success, message, error }
}

async function checkAppliedByUser(jobId, userId) {
  let isApplied = true;

  if (jobId && userId) {

    const conditions = {
      job_id: {
        [Op.eq]: jobId,
      },
      created_by: {
        [Op.eq]: userId
      }
    };
    await Apply.count({ where: conditions }).then((rowCount) => {
      if (rowCount <= 0) {
        isApplied = false;
      }
    });
  }
  
  return isApplied;
}

module.exports = {
  applyResume,
  checkAppliedByUser
}