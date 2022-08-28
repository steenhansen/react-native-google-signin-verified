
// This is the node.js, Express.js server code that executes to verify that 
// the gmail is actually logged into Phone-Recipes and Google Mail on a 
// mobile React Native Device

// https://phone-recipes.herokuapp.com/validate-token/abcdefghijklmonpqrstuvwxyz234567890

const { OAuth2Client } = require('google-auth-library');
const webClientId = "703366983526-rqp153lgutts5rhlhit133tuv77p0pja.apps.googleusercontent.com";
const oauth2client = new OAuth2Client(webClientId);

async function verifyIdToken(id_token) {
  const oauth_ticket = await oauth2client.verifyIdToken({
    idToken: id_token,
    audience: webClientId
  });
  const oauth_payload = oauth_ticket.getPayload();
  const user_id = oauth_payload['sub'];
  if (Number.isInteger(user_id) && user_id > 1234567890) {
    return user_id;                                // ex 123456789012345678901
  }
  return 'OAuth Failed';
}

app.get("/validate-token/*", async (req, res) => {
  const the_url = req.originalUrl;
  const [_1, _2, id_token] = the_url.split("/");
  const trimmed_token = id_token.trim();
  let user_id = 'Invalid Token';
  if (trimmed_token !== '') {
    user_id = await verifyIdToken(trimmed_token).catch(console.error);
  }
  res.send(user_id);
});
