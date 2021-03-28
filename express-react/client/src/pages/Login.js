import React from 'react';
import { useHistory } from 'react-router';

const Login = () => {
  const history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username: event.target.username.value,
        password: event.target.password.value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        res.json().then(data => {
          // TODO: Store in cookie
          localStorage.setItem('token', data.token)
        });
        history.push('/');
      } else {
        throw new Error(res.error);
      }
    }).catch(err => {
      console.error(err);
    });
  }

  return (
    <>
      <h3>
        Login
      </h3>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            Username
            <input name='username' type='text' placeholder='username' />
          </label>
        </div>
        <div>
          <label>
            Password
            <input name='password' type='password' placeholder='password' />
          </label>
        </div>
        <button type='submit'>Log In</button>
      </form>
    </>
  )
}

export default Login;