import React from 'react';
import { Alert, Button, Container, Form, Spinner } from 'react-bootstrap';
import { Animated } from 'react-animated-css';
import AutoHeight from 'components/AutoHeight';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const FormUI = ({
  onSubmit,
  authenticationFailed,
  onErrorClose,
  checkInputError,
  isUsernameInvalid,
  isPasswordInvalid,
  isLoading,
}) => {
  // class setup
  const formClass = classNames('px-3', {
    'mt-1': authenticationFailed,
  });
  return (
    <Container className='shadow rounded py-3 px-0'>
      <h1 className='px-3'>Log In</h1>
      <AutoHeight>
        {authenticationFailed && (
          <Animated animationIn='flipInX'>
            <Alert
              variant='danger'
              dismissible
              onClose={onErrorClose}
              className='mx-3'
            >
              <Alert.Heading>Invalid username or password!</Alert.Heading>
              <p>Check your spellings man.</p>
            </Alert>
          </Animated>
        )}
      </AutoHeight>
      <Form onSubmit={onSubmit} className={formClass}>
        <Form.Group controlId='formUsername'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Username'
            required
            onChange={checkInputError}
            onInvalid={checkInputError}
            isInvalid={isUsernameInvalid}
          />
        </Form.Group>
        <Form.Group controlId='formPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            required
            onChange={checkInputError}
            onInvalid={checkInputError}
            isInvalid={isPasswordInvalid}
          />
        </Form.Group>
        <Button variant='primary' type='submit' block>
          {isLoading ? (
            <Spinner
              as='span'
              animation='border'
              size='sm'
              role='status'
              aria-hidden='true'
            ></Spinner>
          ) : (
            'Enter'
          )}
        </Button>
      </Form>
    </Container>
  );
};

FormUI.propTypes = {
  onSubmit: PropTypes.func,
  authenticationFailed: PropTypes.bool,
  onErrorClose: PropTypes.func,
  checkInputError: PropTypes.func,
  isUsernameInvalid: PropTypes.bool,
  isPasswordInvalid: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default FormUI;
