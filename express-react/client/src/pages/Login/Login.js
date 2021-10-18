import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from 'context/UserContext';
import { logIn } from 'utils/session';
import LoginForm from 'components/LoginForm';
import Center from 'components/Center';
import { getCookie } from 'utils/cookies';

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (getCookie('token') && user) {
      history.push('/dashboard');
      return;
    }
    logIn()
      .then((body) => {
        setUser(body.user);
        history.push('/dashboard');
      })
      .catch(console.error);
  });

  return (
    <Center className='m-3'>
      <LoginForm />
    </Center>
  );
};

export default Login;
