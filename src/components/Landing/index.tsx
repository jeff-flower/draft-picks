import React from 'react';
import { Link } from 'react-router-dom';

import { useUserSession } from '../UserSession';
import { PICKS, SIGN_IN, SIGN_UP, RULES } from '../../constants/routes';

export const LandingPage = () => {
  const user = useUserSession();

  return (
    <section>
      <h1>Welcome back!</h1>
      {user ? <SignedInLanding /> : <NotSignedInLanding />}
    </section>
  );
};

const SignedInLanding = () => (
  <>
    <p>
      Need a reminder how this works? Check out the <RulesLink />
    </p>
    <p>
      Think rules are for sissies? Start making your <PicksLink />!
    </p>
  </>
);

const NotSignedInLanding = () => (
  <>
    <p>
      Returning player? Head here to <SignInLink />
    </p>
    <p>
      Need a refresher before you get started? Check out the <RulesLink />
    </p>
    <p>
      New player? <SignUpLink />!
    </p>
  </>
);

const SignInLink = () => (
  <Link to={SIGN_IN}>sign in or reset your password</Link>
);
const RulesLink = () => <Link to={RULES}>rules</Link>;
const PicksLink = () => <Link to={PICKS}>picks</Link>;
const SignUpLink = () => <Link to={SIGN_UP}>Sign up</Link>;
