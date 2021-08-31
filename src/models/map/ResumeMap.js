const { Resume } = require("../orm")
const { currentDateTime } = require("../../utils/DateTime")

async function createResume(insertData) {
  let success = false, message = "Add new company failed", error = null
  const newData = {
    created_at: currentDateTime(),
    ...insertData
  }

  await Resume.create(newData)
    .then(() => {
      success = true
      message = "Add resume completed"
    })
    .catch(e => {
      error = e.message
    })

  return { success, message, error }
}

async function deleteResume() {

}

module.exports = {
  createResume,
  deleteResume
}