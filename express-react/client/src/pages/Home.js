import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <>
    <h1>
      Home
      </h1>
    <u>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/secret'>Secret</Link>
      </li>
    </u>
  </>
)


export default Home;