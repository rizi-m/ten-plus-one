import { UserContext } from 'context/UserContext';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { setCookie } from 'utils/cookies';
import FormUI from './FormUI';

const LoginForm = () => {
  // setup
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [authenticationFailed, setAuthenticationFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // event handlers
  const onSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target;
    const username = form.querySelector('#formUsername').value;
    const password = form.querySelector('#formPassword').value;

    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            setUser(data.user);
            setCookie('token', data.token);
          });
          history.push('/dashboard');
        } else if (res.status === 401) {
          setAuthenticationFailed(true);
          setIsUsernameInvalid(true);
          setIsPasswordInvalid(true);
        } else {
          throw new Error(res.error);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  const checkInputError = (event) => {
    event.preventDefault();
    const id = event.target.id;
    const isInvalid = !event.target.value;
    const validSetters = {
      formUsername: setIsUsernameInvalid,
      formPassword: setIsPasswordInvalid,
    };
    validSetters[id](isInvalid);
  };

  return (
    <FormUI
      onSubmit={onSubmit}
      authenticationFailed={authenticationFailed}
      onErrorClose={() => setAuthenticationFailed(false)}
      checkInputError={checkInputError}
      isUsernameInvalid={isUsernameInvalid}
      isPasswordInvalid={isPasswordInvalid}
      isLoading={isLoading}
    />
  );
};

export default LoginForm;
