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
import { SignInPage } from '../SignIn';
import { UserSessionProvider } from '../UserSession';

export const App = () => {
  return (
    <Router>
      <UserSessionProvider>
        <>
          <Navigation />
          <main>
            <Switch>
              <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
              <Route path={ROUTES.SIGN_IN} component={SignInPage} />
              <Route
                path={ROUTES.PASSWORD_FORGET}
                component={PasswordForgetPage}
              />
              <Route path={ROUTES.HOME} component={HomePage} />
              <Route path={ROUTES.ACCOUNT} component={AccountPage} />
              <Route path={ROUTES.ADMIN} component={AdminPage} />
              <Route path={ROUTES.LANDING} component={LandingPage} />
            </Switch>
          </main>
        </>
      </UserSessionProvider>
    </Router>
  );
};
