import React from 'react';
import { useHistory } from 'react-router';
import { logOut } from 'utils/session';
import NavUI from './NavUI';

const Navigator = () => {
  const history = useHistory();
  const onLogOut = () => {
    logOut().then(() => history.push('/'));
  };
  return <NavUI onLogOut={onLogOut} />;
};

export default Navigator;
