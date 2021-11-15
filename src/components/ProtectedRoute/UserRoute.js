import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

function UserRoute({ Component: component, ...rest }) {
  const token = localStorage.getItem('token');
  let user = null;
  if (token) {
    user = jwt_decode(token);
  }

  if (!token && !user) {
    // eslint-disable-next-line react/jsx-no-undef
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  return <Redirect to='/feeds' />;
}

export default UserRoute;
