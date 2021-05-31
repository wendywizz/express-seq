const moment = require("moment")
const dateTimeFormat = "YYYY-MM-DD HH:mm:ss"
const dateFormat = "YYYY-MM-DD"

function currentDate() {
  return moment(new Date()).format(dateFormat)
}
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
  currentDate,
  currentDateTime,
  formatDateTime,
  formatDate
}