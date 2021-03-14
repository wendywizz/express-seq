const moment = require("moment")
const dateTimeFormat = "YYYY-MM-DDTHH:mm:ss";

function currentDateTime() {
  return moment(new Date()).format(dateTimeFormat);
}
function formatDateTime(value) {
  return moment(value).format(dateTimeFormat);
}

module.exports = {
  currentDateTime,
  formatDateTime
}