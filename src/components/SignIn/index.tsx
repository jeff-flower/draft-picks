import React from 'react';
import { useHistory } from 'react-router-dom';

import { SignUpLink } from '../SignUp';
import { useFirebaseContext } from '../Firebase';
import { HOME } from '../../constants/routes';

export const SignInPage: React.FC<{}> = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [error, setError] = React.useState<any>();
  const history = useHistory();
  const firebaseContext = useFirebaseContext();

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    firebaseContext
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail('');
        setPassword('');
        history.push(HOME);
      })
      .catch((error: any) => {
        setError(error);
      });
  };

  const isInvalid = email === '' || password === '';

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            type="email"
          />
        </label>
        <label>
          Password
          <input
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            type="password"
          />
        </label>
        <button type="submit" disabled={isInvalid}>
          Sign In
        </button>
        {error && <p>{error.message}</p>}
      </form>
      <SignUpLink />
    </div>
  );
};
