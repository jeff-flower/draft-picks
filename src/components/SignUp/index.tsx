import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as firebase from 'firebase/app';

import { HOME, SIGN_UP } from '../../constants/routes';
import { useFirebaseContext } from '../Firebase';

export const SignUpPage = () => (
  <div>
    <h1>Sign Up</h1>
    <SignUpForm />
  </div>
);

const SignUpForm: React.FC<{}> = () => {
  const [username, setUsername] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [error, setError] = React.useState<null | firebase.auth.AuthError>(
    null
  );
  const firebaseInstance = useFirebaseContext();
  const history = useHistory();

  const onSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (!isInvalid && firebaseInstance) {
      firebaseInstance
        .doCreateUserWithEmailAndPassword(email, password)
        .then(() => history.push(HOME))
        .catch((error) => setError);
    }
  };

  const isInvalid = password === '' || email === '' || username === '';

  return (
    <form onSubmit={onSubmit}>
      <label>
        Username
        <input
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
      </label>
      <label>
        Username
        <input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
      </label>
      <label>
        Password
        <input
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </label>
      <button disabled={isInvalid} type="submit">
        Sign Up
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

export const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={SIGN_UP}>Sign Up</Link>
  </p>
);
