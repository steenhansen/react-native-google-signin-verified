import { GoogleSignin } from '@react-native-google-signin/google-signin';

const web_client_id = require('./config.json').webClientId;
const types_of_data = ['profile', 'email'];

GoogleSignin.configure({ scopes: types_of_data, webClientId: web_client_id });

async function signIn(setCurrent_gmail, setUser_id, setId_token) {
  try {
    await GoogleSignin.hasPlayServices();
    const user_info = await GoogleSignin.signIn();
    console.log('***signIn', user_info.user.email);
    setCurrent_gmail(user_info.user.email);
    setUser_id(user_info.user.id);
    setId_token(user_info.idToken);
  } catch (error) {
    console.log('ERROR - signIn - ', error);
  }
};

async function signInSilently(setCurrent_gmail, setUser_id, setId_token) {
  try {
    await GoogleSignin.hasPlayServices();
    const user_info = await GoogleSignin.signInSilently();
    console.log('***signInSilently', user_info.user.email);
    setCurrent_gmail(user_info.user.email);
    setUser_id(user_info.user.id);
    setId_token(user_info.idToken);
  } catch (error) {
    if (error.message !== "SIGN_IN_REQUIRED") {
      console.log('ERROR - signInSilently - ', error);
    }
  }
};

async function signOut(setCurrent_gmail, setUser_id, setId_token) {
  try {
    await GoogleSignin.hasPlayServices();
    GoogleSignin.signOut().then(_ => {
      setCurrent_gmail('');
      setUser_id('');
      setId_token('');
    });
    console.log('***signOut');
  } catch (error) {
    console.log('ERROR - signOut - ', error);
  }
}

export { signIn, signInSilently, signOut };
