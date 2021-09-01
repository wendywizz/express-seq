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

module.exports = {
  applyResume
}