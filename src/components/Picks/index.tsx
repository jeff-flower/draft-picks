import React from 'react';
import Form from 'react-bootstrap/Form';

import { useFirebaseContext } from '../Firebase';
import { PicksData } from '../Firebase/firebase';
import { UserPick } from '../Firebase/util';
import { SIGN_IN } from '../../constants/routes';

export const PicksPage: React.FC<{}> = () => {
  const [players, setPlayers] = React.useState<string[]>([]);
  const [picks, setPicks] = React.useState<UserPick[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingError, setLoadingError] = React.useState<boolean>(false);
  const firebaseApi = useFirebaseContext();

  React.useEffect(() => {
    const getPicks = async () => {
      // TODO: try/catch, check for picksData.hasError

      setLoading(true);
      const picksData: PicksData = await firebaseApi.getPicksDataForUser();

      if (picksData.playerNames) {
        setPlayers(picksData.playerNames);
      }

      if (picksData.picks) {
        setPicks(picksData.picks);
      }

      setLoading(false);
    };

    getPicks();
  }, [firebaseApi]);

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
      <h1>Your Picks</h1>
      {loading && <p>loading picks data...</p>}
      {loadingError && <p>Oh boy, something went wrong</p>}
      {!loading && !loadingError && picks && (
        <Form>
          <PicksDropdowns picks={picks} players={players} />
        </Form>
      )}
    </div>
  );
};

/*
picks form should be dumb
pass players, picks, callback for updating pick, callback for saving
button should be disabled on submit
showing loading indicator while fetching picks data
<form>
<picks>
<submit button>
</form>
*/

const PicksDropdowns: React.FC<{ picks: UserPick[]; players: string[] }> = ({
  picks,
  players,
}) => {
  const playerOptions = players.map((player, index) => (
    <option key={index}>{player}</option>
  ));
  const dropdowns = picks.map(({ pickNumber, pick, team }) => (
    <Form.Group key={pickNumber} controlId={`picksDropdown${pickNumber}`}>
      <Form.Label>{`${pickNumber}. ${team}`}</Form.Label>
      <Form.Control as="select">{playerOptions}</Form.Control>
    </Form.Group>
  ));

  return <>{dropdowns}</>;
};
