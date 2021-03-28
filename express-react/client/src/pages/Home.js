import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../components/logoutbutton/LogoutLink';
import { UserContext } from '../context/UserContext';

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <>
      <h1>
        Home
      </h1>
      <u>
        {!user &&
          <li>
            <Link to='/login'>Login</Link>
          </li>
        }
        {user &&
          <>
            <li>
              <LogoutButton />
            </li>
            <li>
              <Link to='/secret'>Secret</Link>
            </li>
          </>
        }
      </u>
    </>
  )
}


export default Home;