import React from 'react';
import Table from 'react-bootstrap/Table';

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
      {!allPicks.length && <p>loading all picks...</p>}
      {!!allPicks.length && (
        <Table striped bordered variant="dark" responsive>
          <thead>
            <tr>
              <th>Player</th>
              {Array.from(new Array(32), (x, i) => i).map((val) => (
                <th key={val}>{val + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allPicks.map((userPicksSummary) => (
              <PicksRow
                key={userPicksSummary.username}
                picksSummary={userPicksSummary}
              />
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

const PicksRow: React.FC<{ picksSummary: PicksSummary }> = ({
  picksSummary,
}) => {
  const { username, orderedPicks } = picksSummary;
  return (
    <tr>
      <td>{username}</td>
      {orderedPicks.map((playerName, index) => (
        <td key={`${username}-pick${index}`}>{playerName}</td>
      ))}
    </tr>
  );
};
