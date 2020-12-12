import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './containers/HomePage/HomePage';
import LoginPage from './containers/LoginPage/LoginPage';
import RegisterPage from './containers/RegisterPage/RegisterPage';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          {/* only logged in user can access this home route */}
          <PrivateRoute path='/' exact component={HomePage} />

          <Route path='/login' component={LoginPage} />
          <Route path='/signup' component={RegisterPage} />
          <Redirect to='/' />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
