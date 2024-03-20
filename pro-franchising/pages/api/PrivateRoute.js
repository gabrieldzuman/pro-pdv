import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ children, token, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
