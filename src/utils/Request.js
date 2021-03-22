const fetch = require('node-fetch');

const HEADERS = {
  "Content-Type": "application/json",
}
async function sendPost(uri, bodyData) {
  return await fetch(uri, {
    method: "POST",
    body: JSON.stringify(bodyData),
    headers: HEADERS
  })
    .then(res => res.json())
    .then(data => {
      return data
    })
    .catch(error => {
      console.error(error.message)
    })
}

module.exports = {  
  sendPost
}