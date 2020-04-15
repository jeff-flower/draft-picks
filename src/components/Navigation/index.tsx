import React from 'react';
import { Link } from 'react-router-dom';

import { SignOutButton } from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { useUserSession } from '../UserSession';

import './nav.css';

export const Navigation: React.FC<{}> = () => {
  const user = useUserSession();
  return (
    <nav className="navheader">
      {user ? <AuthorizedUserNavigation /> : <UnauthorizedUserNavigation />}
    </nav>
  );
};

const AuthorizedUserNavigation: React.FC<{}> = () => (
  <>
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.RULES}>Rules</Link>
      </li>
      <li>
        <Link to={ROUTES.PICKS}>Picks</Link>
      </li>
      <li className="signout">
        <SignOutButton />
      </li>
    </ul>
  </>
);

const UnauthorizedUserNavigation: React.FC<{}> = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
    <li>
      <Link to={ROUTES.RULES}>Rules</Link>
    </li>
  </ul>
);
