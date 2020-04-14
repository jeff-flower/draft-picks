import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import { useFirebaseContext } from '../Firebase';
import { LANDING } from '../../constants/routes';

export const SignOutButton: React.FC<{}> = () => {
  const firebaseContext = useFirebaseContext();
  const history = useHistory();

  const handleClick = async () => {
    await firebaseContext.doSignOut();
    history.push(LANDING);
  };

  return (
    <Button onClick={handleClick} variant="outline-dark" size="sm">
      Sign Out
    </Button>
  );
};
