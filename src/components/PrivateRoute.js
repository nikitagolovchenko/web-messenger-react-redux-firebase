import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// если пользователь сохранен в localstorage - можно перейти на HomePage '/'  
// иначе HomePage будет не доступна и будет перенаправляться на '/login'

const PrivateRoute = ({ component: Component, ...rest }) => {
  // {component: Component}  -  берем реакт компонент переданный в component и сохраняем его в переменную Component

  return (
    <Route
      {...rest}
      component={(props) => {
        const user = localStorage.getItem('user')
          ? JSON.parse(localStorage.getItem('user'))
          : null;

        if (user) {
          return <Component {...props} />;
        } else {
          return <Redirect to={'/login'} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
