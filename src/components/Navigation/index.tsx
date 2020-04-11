import React from 'react';
import { Link } from 'react-router-dom';

import { SignOutButton } from '../SignOut';
import * as ROUTES from '../../constants/routes';

export const Navigation: React.FC<{ user: any | null }> = ({ user }) => (
  <nav>
    {user ? <AuthorizedUserNavigation /> : <UnauthorizedUserNavigation />}
  </nav>
);

const AuthorizedUserNavigation: React.FC<{}> = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const UnauthorizedUserNavigation: React.FC<{}> = () => (
  <ul>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
  </ul>
);
