import React from 'react';
import * as firebase from 'firebase/app';

import { useFirebaseContext } from '../Firebase';

const UserContext = React.createContext<null | firebase.User>(null);

const useSessionState = () => {
  const [user, setUser] = React.useState<any | null>(null);
  const firebaseContext = useFirebaseContext();

  React.useEffect(() => {
    const onAuthStateChange = (user: any) => {
      user ? setUser(user) : setUser(null);
    };

    const unsubscribe = firebaseContext.listenToAuthState(onAuthStateChange);

    return unsubscribe;
  }, [firebaseContext]);

  return user;
};

export const UserSessionProvider: React.FC<{}> = ({ children }) => {
  const user = useSessionState();

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUserSession = () => {
  const userSessionContext = React.useContext(UserContext);

  if (userSessionContext === undefined) {
    throw new Error(
      'user session context must be used inside firebase provider'
    );
  }

  return userSessionContext;
};
