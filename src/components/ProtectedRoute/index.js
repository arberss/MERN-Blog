import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

function ProtectedRoute({ Component: component, protectedRole, ...rest }) {
  const token = localStorage.getItem('token');
  let user = null;
  if (token) {
    user = jwt_decode(token);
  }

  if (token && protectedRole?.includes(user?.role)) {
    // eslint-disable-next-line react/jsx-no-undef
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } else if (token && !protectedRole?.includes(user?.role)) {
    return <Redirect to='/posts' />;
  }
  return <Redirect to='/login' />;
}

export default ProtectedRoute;
