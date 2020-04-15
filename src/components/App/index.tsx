import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AdminPage } from '../Admin';
import { Navigation } from '../Navigation';
import { LandingPage } from '../Landing';
import { SignUpPage } from '../SignUp';
import { PasswordForgetPage } from '../PasswordForget';
import { RulesPage } from '../Rules';
import { AccountPage } from '../Account';

import * as ROUTES from '../../constants/routes';
import { UserSessionProvider } from '../UserSession';
import { PrivateRoute } from '../PrivateRoute';
import { PicksPage } from '../Picks';
import { SignInPage } from '../SignIn';

import './app.css';

export const App = () => {
  return (
    <Router>
      <UserSessionProvider>
        <>
          <Navigation />
          <main className="main">
            <Switch>
              <Route path={ROUTES.SIGN_UP}>
                <SignUpPage />
              </Route>
              <Route path={ROUTES.SIGN_IN}>
                <SignInPage />
              </Route>
              <Route path={ROUTES.PASSWORD_FORGET}>
                <PasswordForgetPage />
              </Route>
              <Route path={ROUTES.RULES}>
                <RulesPage />
              </Route>
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
