import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import { useFirebaseContext } from '../Firebase';
import { PicksData } from '../Firebase/firebase';
import { UserPick } from '../Firebase/util';

import './picks.css';

const hasDuplicates = (picks: UserPick[]): boolean => {
  const picksWithoutEmpties = picks.filter((pick) => pick.pick !== '');
  const pickNames = picksWithoutEmpties.map((pick) => pick.pick);
  const uniquePicks = new Set(pickNames);
  return uniquePicks.size < pickNames.length;
};

export const PicksPage: React.FC<{}> = () => {
  const [players, setPlayers] = React.useState<string[]>([]);
  const [picks, setPicks] = React.useState<UserPick[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [saving, setSaving] = React.useState<boolean>(false);
  const firebaseApi = useFirebaseContext();

  React.useEffect(() => {
    const getPicks = async () => {
      // TODO: try/catch, check for picksData.hasError

      setLoading(true);
      const picksData: PicksData = await firebaseApi.getPicksDataForUser();

      if (picksData.playerNames) {
        setPlayers(['', ...picksData.playerNames]);
      }

      if (picksData.picks) {
        const sorted = [...picksData.picks];
        sorted.sort((a, b) => (a.pickNumber < b.pickNumber ? -1 : 1));
        setPicks(sorted);
      }

      setLoading(false);
    };

    getPicks();
  }, [firebaseApi]);

  const handlePickSelection = (newPick: UserPick) => {
    setPicks((oldPicks) => {
      const updatedPicks = [...oldPicks];
      const replaceIndex = updatedPicks.findIndex(
        (currentPick) => currentPick.pickNumber === newPick.pickNumber
      );
      if (replaceIndex !== -1) {
        updatedPicks.splice(replaceIndex, 1, newPick);
      } else {
        console.log('could not find matching pick');
      }
      return updatedPicks;
    });
  };

  const savePicks = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (!saving) {
      setSaving(true);
      const result = await firebaseApi.saveUserPicks(picks);
      setSaving(false);
      if (result.hasError) {
        console.log(result.error);
      } else {
        console.log('success');
      }
    }
  };

  return (
    <div>
      <h1>Your Picks</h1>
      {loading && <p>loading picks data...</p>}
      {!loading && picks && (
        <Form onSubmit={savePicks}>
          <Alert
            className={hasDuplicates(picks) ? '' : 'hide-duplicates'}
            variant="danger"
          >
            Watch out! You have duplicate picks.
          </Alert>
          <div className="picksContainer">
            <div>
              <PicksDropdowns
                picks={picks.slice(0, 16)}
                players={players}
                onPlayerPicked={handlePickSelection}
              />
            </div>
            <div>
              <PicksDropdowns
                picks={picks.slice(16)}
                players={players}
                onPlayerPicked={handlePickSelection}
              />
            </div>
          </div>
          {hasDuplicates(picks) && (
            <Alert variant="danger">Watch out! You have duplicate picks.</Alert>
          )}
          <Button variant="primary" type="submit" disabled={saving}>
            {!saving && <span>Save Picks</span>}
            {saving && (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="sr-only">Loading...</span>
              </>
            )}
          </Button>
        </Form>
      )}
    </div>
  );
};

const PicksDropdowns: React.FC<{
  picks: UserPick[];
  players: string[];
  onPlayerPicked: (pick: UserPick) => void;
}> = ({ picks, players, onPlayerPicked }) => {
  const playerOptions = players.map((player, index) => (
    <option key={index} value={player}>
      {player}
    </option>
  ));
  const dropdowns = picks.map(({ pickNumber, pick, team }) => (
    <Form.Group key={pickNumber} controlId={`picksDropdown${pickNumber}`}>
      <Form.Label>{`${pickNumber}. ${team}`}</Form.Label>
      <Form.Control
        as="select"
        value={pick}
        onChange={(e: any) => {
          e.preventDefault();
          const pick: UserPick = { pickNumber, team, pick: e.target.value };
          onPlayerPicked(pick);
        }}
      >
        {playerOptions}
      </Form.Control>
    </Form.Group>
  ));

  return <>{dropdowns}</>;
};
