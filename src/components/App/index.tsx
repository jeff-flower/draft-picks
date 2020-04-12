import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AdminPage } from '../Admin';
import { Navigation } from '../Navigation';
import { LandingPage } from '../Landing';
import { SignUpPage } from '../SignUp';
import { PasswordForgetPage } from '../PasswordForget';
import { HomePage } from '../Home';
import { AccountPage } from '../Account';

import * as ROUTES from '../../constants/routes';
import { UserSessionProvider } from '../UserSession';
import { PrivateRoute } from '../PrivateRoute';
import { PicksPage } from '../Picks';

export const App = () => {
  return (
    <Router>
      <UserSessionProvider>
        <>
          <Navigation />
          <main>
            <Switch>
              <Route path={ROUTES.SIGN_UP}>
                <SignUpPage />
              </Route>
              <Route path={ROUTES.PASSWORD_FORGET}>
                <PasswordForgetPage />
              </Route>
              <PrivateRoute path={ROUTES.HOME}>
                <HomePage />
              </PrivateRoute>
              <PrivateRoute path={ROUTES.PICKS}>
                <PicksPage />
              </PrivateRoute>
              <PrivateRoute path={ROUTES.ACCOUNT}>
                <AccountPage />
              </PrivateRoute>
              <PrivateRoute path={ROUTES.ADMIN}>
                <AdminPage />
              </PrivateRoute>
              <Route path={ROUTES.LANDING}>
                <LandingPage />
              </Route>
            </Switch>
          </main>
        </>
      </UserSessionProvider>
    </Router>
  );
};
