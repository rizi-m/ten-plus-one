import { UserContext } from 'context/UserContext';
import React, { useMemo, useState } from 'react';
import FormUI from './FormUI';

export default {
  title: 'Composite/LoginForm',
  component: FormUI,
};

export const Base = () => {
  return <FormUI checkInputError={(e) => e.preventDefault()} />;
};

export const InputErrors = () => {
  return (
    <FormUI
      isUsernameInvalid
      isPasswordInvalid
      checkInputError={(e) => e.preventDefault()}
    />
  );
};

InputErrors.storyName = 'Input Errors';

export const Loading = () => {
  return <FormUI isLoading checkInputError={(e) => e.preventDefault()} />;
};

Loading.storyName = 'Loading';

export const FailedAuthentication = () => {
  const [authenticationFailed, setAuthenticationFailed] = useState(true);
  return (
    <FormUI
      authenticationFailed={authenticationFailed}
      setAuthenticationFailed={setAuthenticationFailed}
      isUsernameInvalid
      isPasswordInvalid
      checkInputError={(e) => e.preventDefault()}
      onSubmit={(e) => {
        e.preventDefault();
        setAuthenticationFailed(true);
      }}
    />
  );
};

FailedAuthentication.storyName = 'Failed authentication';
