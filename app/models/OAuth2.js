const { sendPost } = require("../utils/Request")

async function credential(userType) {
  const uri = "https://oauth2.eng.psu.ac.th/clientcredentials"
  const clientId = process.env.CLIENT_ID
  const clientSecret = process.env.CLIENT_SECRET

  if (clientId && clientSecret) {
    const bodyData = {
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret
    }

    return await sendPost(uri, bodyData)
  } else {
    return null
  }
}

module.exports = {
  credential
}