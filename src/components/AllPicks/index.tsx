import React from 'react';

import { useFirebaseContext } from '../Firebase';
import { PicksSummary } from '../Firebase/firebase';

export const AllPicksPage: React.FC<{}> = () => {
  const firebaseApi = useFirebaseContext();
  const [allPicks, setAllPicks] = React.useState<PicksSummary[]>([]);

  React.useEffect(() => {
    const getPicks = async () => {
      const allPicks: PicksSummary[] = await firebaseApi.getAllPicks();
      setAllPicks(allPicks);
    };

    getPicks();
  }, [firebaseApi]);

  return (
    <div>
      <h1>All Picks</h1>
    </div>
  );
};
