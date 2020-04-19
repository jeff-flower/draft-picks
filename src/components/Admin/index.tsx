import React from 'react';

import { useFirebaseContext } from '../Firebase';

export const AdminPage = () => {
  const firebaseApi = useFirebaseContext();
  const handleClick = async () => {
    const result = await firebaseApi.saveActualPick();
    console.log(result);
  };

  return (
    <div>
      <h1>Admin</h1>
      <button onClick={handleClick}>Add Actual Pick</button>
    </div>
  );
};
