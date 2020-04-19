import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useFirebaseContext } from '../Firebase';
import { ActualPick } from '../Firebase/util';

export const AdminPage = () => {
  const [players, setPlayers] = React.useState<string[]>([]);
  const [playerName, setPlayerName] = React.useState<string>('');
  const [pickNumber, setPickNumber] = React.useState<number | null>(null);
  const firebaseApi = useFirebaseContext();

  React.useEffect(() => {
    const loadPlayers = async () => {
      try {
        const players = await firebaseApi.getPlayerList();
        setPlayers(players);
      } catch (e) {
        console.log(e);
      }
    };

    loadPlayers();
  }, [firebaseApi]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (pickNumber && playerName) {
      const actualPick: ActualPick = {
        pickNumber,
        player: playerName,
      };
      const result = await firebaseApi.saveActualPick(actualPick);
      console.log(result);
    }
  };

  return (
    <div>
      <h1>Admin</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="pickNumber">
          <Form.Label>Pick Number</Form.Label>
          <Form.Control
            type="number"
            value={pickNumber || ''}
            onChange={(e: any) => setPickNumber(parseInt(e.target.value, 10))}
          />
        </Form.Group>
        <Form.Group controlId="player">
          <Form.Label>Player</Form.Label>
          <Form.Control
            as="select"
            value={playerName}
            onChange={(e: any) => setPlayerName(e.target.value)}
          >
            {players.map((player) => (
              <option key={player} value={player}>
                {player}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button type="submit">Add Actual Pick</Button>
      </Form>
    </div>
  );
};
