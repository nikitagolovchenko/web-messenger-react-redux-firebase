import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { isLoggedInUser } from './actions/auth.actions';
import './App.scss';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './containers/HomePage/HomePage';
import LoginPage from './containers/LoginPage/LoginPage';
import RegisterPage from './containers/RegisterPage/RegisterPage';

function App() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isLoggedInUser());
    }
  }, []);

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
