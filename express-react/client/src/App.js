import './App.css';
import { Route, Switch } from 'react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Secret from './pages/Secret';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/secret' component={Secret} />
      </Switch>
    </div>
  );
}

export default App;
