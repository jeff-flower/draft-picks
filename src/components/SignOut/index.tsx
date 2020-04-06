import React from 'react';
import { useHistory } from 'react-router-dom';

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
    <button type="button" onClick={handleClick}>
      Sign Out
    </button>
  );
};
