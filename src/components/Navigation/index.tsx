import React from 'react';
import { Link } from 'react-router-dom';

import { SignOutButton } from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { useUserSession } from '../UserSession';

export const Navigation: React.FC<{}> = () => {
  const user = useUserSession();
  return <nav>{user ? <AuthorizedUserNavigation /> : null}</nav>;
};

const AuthorizedUserNavigation: React.FC<{}> = () => (
  <ul>
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
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
  </ul>
);
