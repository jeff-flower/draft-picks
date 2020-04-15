import React from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useFirebaseContext } from '../Firebase';
import { LANDING } from '../../constants/routes';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';

import './signin.css';

export const SignInPage: React.FC<{}> = () => {
  return (
    <section className="signin">
      <h1>Sign In</h1>
      <SignInForm />
      <PasswordForgetLink />
      <SignUpLink />
    </section>
  );
};

export const SignInForm: React.FC<{}> = () => {
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
        history.push(LANDING);
      })
      .catch((error: any) => {
        setError(error);
      });
  };

  const isInvalid = email === '' || password === '';

  return (
    <Form onSubmit={handleSubmit} className="signin--form">
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={isInvalid}>
        Sign In
      </Button>
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
    </Form>
  );
};
