import React, { useMemo, useState } from 'react';
// router imports
import { Route, Switch } from 'react-router';
import { UserContext } from './context/UserContext';
import { BrowserRouter } from 'react-router-dom';
// custom
import Login from 'pages/Login';
import Dashboard from 'pages/Dashboard';
import Testing from 'pages/Testing';
import Movies from 'pages/Movies';
import PageLayout from 'components/PageLayout';
import './App.css';
import 'styles/styles.css';
import MoviesSuggest from 'pages/MoviesSuggest';

function App() {
  const [user, setUser] = useState(null);
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  const menuItems = [
    {
      key: '1',
      label: 'Dashboard',
      url: '/dashboard',
    },
    {
      key: '2',
      label: 'Movies',
      url: '/movies',
    },
    {
      key: '3',
      label: 'Test',
      url: '/test',
    },
  ];
  return (
    <BrowserRouter>
      <Switch>
        <UserContext.Provider value={userValue}>
          <Route exact path='/' component={Login} />
          <PageLayout menuItems={menuItems}>
            <Route exact path='/dashboard' component={Dashboard} />
            <Route
              path={'/movies'}
              render={({ match: { url } }) => {
                return (
                  <>
                    <Route path={`${url}/`} component={Movies} exact />
                    <Route path={`${url}/suggest`} component={MoviesSuggest} />
                  </>
                );
              }}
            ></Route>
            <Route exact path='/testing' component={Testing} />
          </PageLayout>
        </UserContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
