import React from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { PASSWORD_FORGET } from '../../constants/routes';
import { useFirebaseContext } from '../Firebase';

import './passwordforget.css';

export const PasswordForgetPage = () => (
  <section className="passwordforget">
    <h1>Reset your password</h1>
    <PasswordForgetForm />
  </section>
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
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Button disabled={isInvalid} type="submit">
        Reset my password
      </Button>
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
    </Form>
  );
};

export const PasswordForgetLink: React.FC<{}> = () => (
  <p>
    <Link to={PASSWORD_FORGET}>Forgot password?</Link>
  </p>
);
