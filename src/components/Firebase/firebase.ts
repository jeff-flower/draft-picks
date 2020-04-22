import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

import {
  buildPicksTemplate,
  UserPick,
  UserTrade,
  scorePick,
  ActualPick,
} from './util';

export type PicksData = {
  playerNames: string[];
  picks: UserPick[];
  hasError: boolean;
  error: any;
};

export type TradesData = {
  teams: string[];
  trades: UserTrade[];
  hasError: boolean;
  error: any;
};

export type ScoredPick = {
  userId: string;
  pickNumber: number;
  player: string;
  score: number;
};

export type PicksSummary = {
  username: string;
  // array of player names in order from pick 1 to 32
  orderedPicks: string[];
};

export type TradesSummary = {
  username: string;
  trades: UserTrade[];
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
        .doc(
          `2020/${process.env.REACT_APP_DB_TABLE}/picks/${
            app.auth().currentUser?.uid
          }`
        )
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
  saveUserPicks: async (
    picks: UserPick[]
  ): Promise<{ hasError: boolean; error?: any }> => {
    try {
      await app
        .firestore()
        .doc(
          `2020/${process.env.REACT_APP_DB_TABLE}/picks/${
            app.auth().currentUser!.uid
          }`
        )
        .set({ picks });
      return { hasError: false };
    } catch (e) {
      return { hasError: true, error: e };
    }
  },
  getTradesDataForUser: async (): Promise<TradesData> => {
    try {
      const teamsDoc = await app.firestore().doc('teams/names').get();
      const userTradesDoc = await app
        .firestore()
        .doc(
          `2020/${process.env.REACT_APP_DB_TABLE}/trades/${
            app.auth().currentUser?.uid
          }`
        )
        .get();

      return {
        teams: teamsDoc.exists ? Object.values(teamsDoc.data()!) : [],
        trades: userTradesDoc.exists ? userTradesDoc.data()!.trades : [],
        hasError: !teamsDoc.exists,
        error: !teamsDoc.exists ? 'Missing teams data' : '',
      };
    } catch (e) {
      return {
        teams: [],
        trades: [],
        hasError: true,
        error: e,
      };
    }
  },
  saveTradesDataForUser: async (
    trades: UserTrade[]
  ): Promise<{ hasError: boolean; error?: any }> => {
    try {
      await app
        .firestore()
        .doc(
          `2020/${process.env.REACT_APP_DB_TABLE}/trades/${
            app.auth().currentUser!.uid
          }`
        )
        .set({ trades });
      return { hasError: false };
    } catch (e) {
      return { hasError: true, error: e };
    }
  },
  saveActualPick: async (actualPick: ActualPick): Promise<any> => {
    try {
      await app
        .firestore()
        .doc(`2020/${process.env.REACT_APP_DB_TABLE}/results/picks`)
        .update({
          picks: firebase.firestore.FieldValue.arrayUnion(actualPick),
        });

      const picksSnapshot = await app
        .firestore()
        .collection(`2020/${process.env.REACT_APP_DB_TABLE}/picks`)
        .get();

      const newScores: ScoredPick[] = [];

      picksSnapshot.forEach((picksDocument) => {
        const picks = picksDocument.data().picks;
        if (picks) {
          const match = picks.find(
            (userPick: UserPick) => userPick.pick === actualPick.player
          );
          if (match) {
            const scoredPick: ScoredPick = {
              userId: picksDocument.id,
              pickNumber: actualPick.pickNumber,
              player: actualPick.player,
              score: scorePick(match, actualPick),
            };

            newScores.push(scoredPick);
          }
        }
      });

      await app
        .firestore()
        .doc(`2020/${process.env.REACT_APP_DB_TABLE}/results/scores`)
        .update({
          scores: firebase.firestore.FieldValue.arrayUnion(...newScores),
        });

      return { hasError: false };
    } catch (e) {
      return { hasError: true, error: e };
    }
  },
  getPlayerList: async (): Promise<string[]> => {
    const playersDoc = await app.firestore().doc(`2020/players`).get();

    if (playersDoc.exists) {
      const playersData = playersDoc.data();
      if (playersData && playersData.players) {
        return playersData.players;
      }
    }

    return [];
  },
  getAllPicks: async (): Promise<PicksSummary[]> => {
    const userMap = await (
      await app.firestore().doc('users/users').get()
    ).data()!;
    const usernameMap = new Map<string, string>();
    for (let [key, value] of Object.entries(userMap)) {
      usernameMap.set(key, value.username);
    }

    const picksSummary: PicksSummary[] = [];
    const picksDocs = await app
      .firestore()
      .collection(`2020/${process.env.REACT_APP_DB_TABLE}/picks`)
      .get();
    picksDocs.forEach((picksDoc) => {
      const username = usernameMap.get(picksDoc.ref.id) || '';
      if (picksDoc.data() && picksDoc.data().picks) {
        const sortedPicks = picksDoc
          .data()
          .picks.sort((pick1: any, pick2: any) => {
            if (pick1.pickNumber < pick2.pickNumber) {
              return -1;
            }

            if (pick2.pickNumber < pick1.pickNumber) {
              return 1;
            }

            return 0;
          });
        const playerNames = sortedPicks.map(
          (sortedPick: any) => sortedPick.pick
        );
        picksSummary.push({ username, orderedPicks: playerNames });
      }
    });

    return picksSummary;
  },
  getAllTrades: async (): Promise<TradesSummary[]> => {
    const userDocs = await app.firestore().collection('users').get();
    const usernameMap = new Map();
    userDocs.forEach((doc) => {
      usernameMap.set(doc.id, doc.data()!.username);
    });

    const tradesSummary: TradesSummary[] = [];
    const tradesDocs = await app
      .firestore()
      .collection(`2020/${process.env.REACT_APP_DB_TABLE}/trades`)
      .get();
    tradesDocs.forEach((tradesDoc) => {
      const username = usernameMap.get(tradesDoc.id);
      if (tradesDoc.data() && tradesDoc.data().trades) {
        tradesSummary.push({ username, trades: tradesDoc.data().trades });
      }
    });

    return tradesSummary;
  },
};
