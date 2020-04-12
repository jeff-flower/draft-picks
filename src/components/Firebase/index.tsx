import React from 'react';
import { PicksData } from './firebase';

import { Firebase } from './firebase';

const FirebaseContext = React.createContext<any>(null);

export const FirebaseProvider: React.FC<{}> = ({ children }) => (
  <FirebaseContext.Provider value={Firebase}>
    {children}
  </FirebaseContext.Provider>
);

export const useFirebaseContext = () => {
  const firebaseContext = React.useContext(FirebaseContext);

  if (firebaseContext === undefined) {
    throw new Error('firebase context must be used inside firebase provider');
  }

  return firebaseContext;
};
