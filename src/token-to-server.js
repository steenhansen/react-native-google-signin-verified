
import { idToken_validate_url } from './app.json';

// https://phone-recipes.herokuapp.com/validate-token/abcdefghijklmonpqrstuvwxyz234567890

async function idTokenToServer(user_id, id_token) {
  if (id_token !== '') {
    const token_url = idToken_validate_url + id_token;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "text/plain" },
    };
    await fetch(token_url, requestOptions)
      .then((response) => {
        return response.text();
      })
      .then((text_response) => {
        if (text_response === user_id) {     /// 123456789012345678901 == 123456789012345678901
          return true;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return false;
}

export { idTokenToServer };