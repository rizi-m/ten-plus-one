import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { deleteCookie } from '../../utils/cookies';


const LogoutButton = () => {
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const logout = (event) => {
    event.preventDefault();
    console.log('logout');
    fetch('/api/logout')
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          setUser(null);
          deleteCookie('token');
          history.push('/');
        }
      }).catch(err => console.log(err));
  };

  return (
    <Link to='/' onClick={logout}>Logout</Link>
  );
}

export default LogoutButton;