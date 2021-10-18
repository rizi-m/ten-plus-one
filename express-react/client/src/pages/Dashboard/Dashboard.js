import React, { useContext, useEffect } from 'react';
import { UserContext } from 'context/UserContext';
import { logIn } from 'utils/session';
import { useHistory } from 'react-router';

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (user) return;
    logIn()
      .then((body) => {
        setUser(body);
      })
      .catch((err) => {
        console.error(err);
        history.push('/');
      });
  });

  return <>Dashboard work in progress</>;
};

export default Dashboard;
