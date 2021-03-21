const moment = require("moment")
const dateTimeFormat = "YYYY-MM-DDTHH:mm:ss"
const dateFormat = "YYYY-MM-DD"

function currentDateTime() {
  return moment(new Date()).format(dateTimeFormat)
}
function formatDateTime(value) {
  return moment(value).format(dateTimeFormat)
}
function formatDate(value) {
  return moment(value).format(dateFormat)
}

module.exports = {
  currentDateTime,
  formatDateTime,
  formatDate
}