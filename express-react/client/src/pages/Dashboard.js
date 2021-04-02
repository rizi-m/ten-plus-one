import React, { useContext, useEffect } from 'react';
import LogoutLink from 'components/LogoutLink';
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

  return (
    <div>
      <h1>Welcome to the dashboard</h1>
      <LogoutLink />
    </div>
  );
};

export default Dashboard;
