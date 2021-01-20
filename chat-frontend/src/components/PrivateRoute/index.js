import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { hasUserSession } from '../../utils/sesion';

const PrivateRoute = (props) => {
  const { children, ...rest } = props;
  if (hasUserSession()) {
    return (<Route {...rest}>{children}</Route>);
  }
  return (<Redirect to="/login" />);
};

export default PrivateRoute;
