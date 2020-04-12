import React from 'react';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { SignIn } from '../SignIn';

export const LandingPage = () => (
  <div>
    <SignIn />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);
