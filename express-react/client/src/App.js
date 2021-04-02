import React, { useMemo, useState } from 'react';
import { Route, Switch } from 'react-router';
import { UserContext } from './context/UserContext';
import Login from 'pages/Login';
import Dashboard from 'pages/Dashboard';
import Testing from 'pages/Testing';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import 'animate.css/animate.css';

function App() {
  const [user, setUser] = useState(null);
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <BrowserRouter>
      <Switch>
        <UserContext.Provider value={userValue}>
          <Route exact path='/' component={Login} />
          <Route exact path='/dashboard' component={Dashboard} />
          {/* <Route exact path='/login' component={Login} />
          <Route exact path='/secret' component={Secret} /> */}
          <Route exact path='/testing' component={Testing} />
        </UserContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
