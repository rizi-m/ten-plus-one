import { UserContext } from 'context/UserContext';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { setCookie } from 'utils/cookies';
import { Form, Input, Button } from 'antd';

const LoginForm = () => {
  // setup
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  const [authenticationFailed, setAuthenticationFailed] = useState(false);

  const [form] = Form.useForm();

  // event handlers
  const onFinish = (data) => {
    const { username, password } = data;
    try {
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
          } else {
            throw new Error(res.error);
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally((_) => {
          form.validateFields().finally((_) => {
            setAuthenticationFailed(false);
          });
        });
    } catch (err) {}
  };

  return (
    <Form name='login' form={form} onFinish={onFinish}>
      <Form.Item
        label='Username'
        name='username'
        validateTrigger='onSubmit'
        rules={[
          {
            validator() {
              if (authenticationFailed) {
                return Promise.reject('Username may be incorrect');
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Password'
        name='password'
        validateTrigger='onSubmit'
        rules={[
          {
            validator() {
              if (authenticationFailed) {
                return Promise.reject('Password may be incorrect');
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Log In
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
