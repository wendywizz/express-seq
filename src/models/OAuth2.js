const { sendPost } = require("../utils/Request")
const fetch = require('node-fetch');

async function credential(userType) {
  const uri = "https://oauth2.eng.psu.ac.th/clientcredentials"
  const clientId = process.env.CLIENT_ID
  const clientSecret = process.env.CLIENT_SECRET

  if (clientId && clientSecret) {
    const bodyData = {
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
      auth_type: userType
    }
    return await sendPost(uri, bodyData)
  } else {
    return null
  }
}

async function verifyToken(accessToken) {
  const uri = "https://oauth2.eng.psu.ac.th/resource/userinfo"
  
  return await fetch(uri, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + accessToken
    }
  })
  .then(res=>res.json())
  .then(data => {
    return data
  })
  .catch(error => {
    console.error(error.message)
  })
}

module.exports = {
  credential,
  verifyToken
}