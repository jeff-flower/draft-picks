import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { UserTrade } from '../Firebase/util';
import { TradesData } from '../Firebase/firebase';
import { useFirebaseContext } from '../Firebase';

export const TradesPage: React.FC<{}> = () => {
  const [teams, setTeams] = React.useState<string[]>([]);
  const [trades, setTrades] = React.useState<UserTrade[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [saving, setSaving] = React.useState<boolean>(false);

  const firebaseApi = useFirebaseContext();

  React.useEffect(() => {
    const getTrades = async () => {
      // TODO: try/catch, check for tradesData.hasError

      setLoading(true);
      const tradesData: TradesData = await firebaseApi.getTradesDataForUser();

      if (tradesData.teams) {
        setTeams(['', ...tradesData.teams]);
      }

      if (tradesData.trades) {
        setTrades(tradesData.trades);
      }

      console.log(tradesData.teams, tradesData.trades);

      setLoading(false);
    };

    getTrades();
  }, [firebaseApi]);

  return (
    <div>
      <h1>Your Trades</h1>
      <Form>
        <Button>Add Trade</Button>
      </Form>
    </div>
  );
};
