import React from 'react';

import { useFirebaseContext } from '../Firebase';
import { PicksData } from '../Firebase/firebase';

export const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <PicksPage />
    </div>
  );
};

const PicksPage: React.FC<{}> = () => {
  const [players, setPlayers] = React.useState<string[]>([]);
  const [picks, setPicks] = React.useState<any>([]);
  const firebaseApi = useFirebaseContext();

  const getPicks = async () => {
    // TODO: try/catch, check for picksData.hasError
    const picksData: PicksData = await firebaseApi.getPicksDataForUser();

    if (picksData.playerNames) {
      setPlayers(picksData.playerNames);
    }

    if (picksData.picks) {
      setPicks(picksData.picks);
    }
  };

  const savePicks = async () => {
    // TODO: show success/error message, loading indicator, disable button
    const result = await firebaseApi.saveUserPicks(picks);
    if (result.hasError) {
      console.log(result.error);
    } else {
      console.log('success');
    }
  };

  return (
    <div>
      <button onClick={getPicks}>Get picks data</button>
      <button onClick={savePicks}>Save picks</button>
    </div>
  );
};
