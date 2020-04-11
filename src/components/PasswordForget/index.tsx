import React from 'react';
import { Link } from 'react-router-dom';

import { PASSWORD_FORGET } from '../../constants/routes';
import { useFirebaseContext } from '../Firebase';

export const PasswordForgetPage = () => (
  <div>
    <h1>Password Forget Page</h1>
    <PasswordForgetForm />
  </div>
);

const PasswordForgetForm: React.FC<{}> = () => {
  const [email, setEmail] = React.useState<string>('');
  const [error, setError] = React.useState<any>(null);
  const firebase = useFirebaseContext();

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    firebase
      .doPasswordReset(email)
      .then(() => {
        setEmail('');
        setError(null);
      })
      .catch((error: any) => {
        setError(error);
      });
  };

  const isInvalid = email === '';

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button disabled={isInvalid} type="submit">
        Reset my password
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

export const PasswordForgetLink: React.FC<{}> = () => (
  <p>
    <Link to={PASSWORD_FORGET}>Forgot password?</Link>
  </p>
);
