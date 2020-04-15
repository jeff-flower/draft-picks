import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as firebase from 'firebase/app';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { RULES, SIGN_UP } from '../../constants/routes';
import { useFirebaseContext } from '../Firebase';

import './signup.css';

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
  const { doCreateUserWithEmailAndPassword } = useFirebaseContext();
  const history = useHistory();

  const onSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (!isInvalid) {
      doCreateUserWithEmailAndPassword(email, password)
        .then(() => history.push(RULES))
        .catch((error: firebase.auth.AuthError) => setError(error));
    }
  };

  const isInvalid = password === '' || email === '' || username === '';

  return (
    <Form onSubmit={onSubmit} className="signup">
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={username}
          onChange={(e: any) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          name="email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          type="email"
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" disabled={isInvalid} type="submit">
        Sign Up
      </Button>
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
    </Form>
  );
};

export const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={SIGN_UP}>Sign Up</Link>
  </p>
);
