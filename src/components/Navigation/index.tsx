import React from 'react';
import { Link } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import { SignOutButton } from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { useUserSession } from '../UserSession';

import './nav.css';

export const Navigation: React.FC<{}> = () => {
  const user = useUserSession();
  return (
    <nav className="navheader">
      <DropdownButton variant="secondary" title="Menu" id="dropdownMenu">
        {user ? <AuthorizedUserNavigation /> : <UnauthorizedUserNavigation />}
      </DropdownButton>
    </nav>
  );
};

const AuthorizedUserNavigation: React.FC<{}> = () => (
  <>
    <Dropdown.Item>
      <Link to={ROUTES.LANDING}>Home</Link>
    </Dropdown.Item>
    <Dropdown.Item>
      <Link to={ROUTES.RULES}>Rules</Link>
    </Dropdown.Item>
    <Dropdown.Item>
      <Link to={ROUTES.PICKS}>Picks</Link>
    </Dropdown.Item>
    <Dropdown.Item>
      <Link to={ROUTES.TRADES}>Trades</Link>
    </Dropdown.Item>
    {/* <Dropdown.Item>
      <Link to={ROUTES.ADMIN}>Admin</Link>
    </Dropdown.Item> */}
    <Dropdown.Divider />
    <Dropdown.Item>
      <SignOutButton />
    </Dropdown.Item>
  </>
);

const UnauthorizedUserNavigation: React.FC<{}> = () => (
  <>
    <Dropdown.Item>
      <Link to={ROUTES.LANDING}>Home</Link>
    </Dropdown.Item>
    <Dropdown.Item>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </Dropdown.Item>
    <Dropdown.Item>
      <Link to={ROUTES.RULES}>Rules</Link>
    </Dropdown.Item>
  </>
);
