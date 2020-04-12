import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { buildPicksTemplate } from './util';

export type PicksData = {
  playerNames: string[];
  picks: any;
  hasError: boolean;
  error: any;
};

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

let app: firebase.app.App;

if (!firebase.apps.length) {
  app = firebase.initializeApp(config);
}

export const Firebase = {
  doCreateUserWithEmailAndPassword: (
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> => {
    return app.auth().createUserWithEmailAndPassword(email, password);
  },
  doSignInWithEmailAndPassword: (
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> => {
    return app.auth().signInWithEmailAndPassword(email, password);
  },
  doSignOut: (): Promise<void> => {
    return app.auth().signOut();
  },
  doPasswordReset: (email: string): Promise<void> => {
    return app.auth().sendPasswordResetEmail(email);
  },
  doPasswordUpdate: (code: string, newPassword: string): Promise<void> => {
    return app.auth().confirmPasswordReset(code, newPassword);
  },
  listenToAuthState: (cb: (user: any) => void): firebase.Unsubscribe =>
    app.auth().onAuthStateChanged(cb),
  getPicksDataForUser: async (): Promise<PicksData> => {
    try {
      const playersDoc = await app.firestore().doc('2020/players').get();
      const userPicksDoc = await app
        .firestore()
        .doc(`2020/dev/picks/${app.auth().currentUser?.uid}`)
        .get();

      return {
        playerNames: playersDoc.exists ? playersDoc.data()!.players : [],
        picks: userPicksDoc.exists
          ? userPicksDoc.data()!.picks
          : buildPicksTemplate(),
        hasError: !playersDoc.exists,
        error: !playersDoc.exists ? 'Missing players information' : '',
      };
    } catch (e) {
      return { playerNames: [], picks: [], hasError: true, error: e };
    }
  },
};

/*
Add user to users in firestore document
How to initialize picks?
get picks: return {players: playerNames, picks: [{pickNumber, team, player picked}]}
save picks: (playerNames[]) => save player names for user

Check for duplicates?
*/

/*
 players: array of player names in format "Name, Position, School"
 picks: array of {pickNumber: number, team: string, player: string}
 */
