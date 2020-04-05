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

export class Firebase {
  private auth: firebase.auth.Auth;

  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
  }

  doCreateUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  doSignInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  doSignOut(): Promise<void> {
    return this.auth.signOut();
  }

  doPasswordReset(email: string): Promise<void> {
    return this.auth.sendPasswordResetEmail(email);
  }

  doPasswordUpdate(code: string, newPassword: string): Promise<void> {
    return this.auth.confirmPasswordReset(code, newPassword);
  }
}
