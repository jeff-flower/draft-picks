import React from 'react';

import { Firebase } from './firebase';

const FirebaseContext = React.createContext<null | Firebase>(null);

export const FirebaseProvider: React.FC<{}> = ({ children }) => (
  <FirebaseContext.Provider value={new Firebase()}>
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