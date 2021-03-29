import './App.css';
import { Route, Switch } from 'react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Secret from './pages/Secret';
import { UserContext } from './context/UserContext';
import { useEffect, useMemo, useState } from 'react';
import { getCookie } from './utils/cookies';

function App() {
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    if (!checked) {
      fetch('/api/check', {
        headers: {
          Authorization: "Bearer " + getCookie("token")
        }
      }).then(res => {
        setChecked(true);
        if (res.status === 200) {
          return res.json();
        }
      }).then(body => {

        if (body && body.isAuthenticated) {
          console.log('setting user', body.user);
          setUser(body.user);
        }
      }).catch(err => {
        setChecked(true);
        console.error(err)
      }
      );
    }
  })

  return (
    <div>
      <Switch>
        <UserContext.Provider value={userValue}>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/secret' component={Secret} />
        </UserContext.Provider>
      </Switch>
    </div>
  );
}

export default App;
