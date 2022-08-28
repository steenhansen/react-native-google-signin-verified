import { View, Button, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { signIn, signInSilently, signOut } from './call-google';
import { idTokenToServer } from './token-to-server';

function react_native_app() {
  const [current_gmail, setCurrent_gmail] = useState('');
  const [user_id, setUser_id] = useState('');
  const [id_token, setId_token] = useState('');

  useEffect(() => {
      async function async_signInSilently() {
        signInSilently(setCurrent_gmail, setUser_id, setId_token);
      }
      async_signInSilently();
    }, []);

  if (current_gmail == '') {
    var the_user = (<View>
      <Text >+++</Text>
      <Button title="sign in" onPress={() => signIn(setCurrent_gmail, setUser_id, setId_token)} />
    </View>);
  } else {
    const token_valid = idTokenToServer(user_id, id_token);
    let is_valid_token = 'no';
    if (token_valid) {
      is_valid_token = 'yes';
    }
    var the_user = (<View>
      <Text >--- {current_gmail} --- Google says u r u {is_valid_token} </Text>
      <Button title="SIGN-OUT" onPress={() => signOut(setCurrent_gmail, setUser_id, setId_token)} />
    </View>);
  }
  return the_user;
}

export default react_native_app;
