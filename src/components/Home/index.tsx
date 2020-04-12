import React from 'react';

import { useFirebaseContext } from '../Firebase';

export const HomePage = () => {
  const firebaseApi = useFirebaseContext();

  const handleClick = async () => {
    const picksData = await firebaseApi.getPicksDataForUser();
    console.log(JSON.stringify(picksData));
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleClick}>Get picks data</button>
    </div>
  );
};
