import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';

import { useUserSession } from '../UserSession';
import { LANDING } from '../../constants/routes';

export const PrivateRoute: React.FC<{ path: string }> = ({
  children,
  ...rest
}) => {
  const location = useLocation();
  const user = useUserSession();

  return (
    <Route {...rest}>
      {user ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: LANDING,
            state: { from: location },
          }}
        />
      )}
    </Route>
  );
};
