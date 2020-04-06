import * as firebase from 'firebase/app';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const Firebase = {
  doCreateUserWithEmailAndPassword: (
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },
  doSignInWithEmailAndPassword: (
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },
  doSignOut: (): Promise<void> => {
    return firebase.auth().signOut();
  },
  doPasswordReset: (email: string): Promise<void> => {
    return firebase.auth().sendPasswordResetEmail(email);
  },
  doPasswordUpdate: (code: string, newPassword: string): Promise<void> => {
    return firebase.auth().confirmPasswordReset(code, newPassword);
  },
};
