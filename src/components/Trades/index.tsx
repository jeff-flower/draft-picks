import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { UserTrade, buildUserTrade } from '../Firebase/util';
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

      setLoading(false);
    };

    getTrades();
  }, [firebaseApi]);

  const addTrade = () => {
    setTrades((oldTrades) => [...oldTrades, buildUserTrade()]);
  };

  const handleTradeChange = (
    value: string,
    type: keyof UserTrade,
    index: number
  ) => {
    setTrades((oldTrades) => {
      const updatedTrades = [...oldTrades];
      const tradeToUpdate = { ...oldTrades[index] };
      tradeToUpdate[type] = value;
      updatedTrades[index] = tradeToUpdate;

      return updatedTrades;
    });
  };

  return (
    <div>
      <h1>Your Trades</h1>
      {loading && <p>loading trades...</p>}
      {!loading && trades && (
        <>
          <Button onClick={addTrade}>Add Trade</Button>
          {trades.map((trade, index) => (
            <TradeForm
              trade={trade}
              tradeNumber={index}
              teams={teams}
              key={index}
              handleChange={handleTradeChange}
            />
          ))}
        </>
      )}
    </div>
  );
};

const TradeForm: React.FC<{
  trade: UserTrade;
  tradeNumber: number;
  teams: string[];
  handleChange: (value: string, type: keyof UserTrade, index: number) => void;
}> = ({ trade, tradeNumber, teams, handleChange }) => {
  const { pickNumber, from, to } = trade;

  const teamOptions = teams.map((team, index) => (
    <option key={index} value={team}>
      {team}
    </option>
  ));
  return (
    <Form>
      <Form.Group controlId="{`pickNumber-${tradeNumber}`}">
        <Form.Label>PickNumber</Form.Label>
        <Form.Control
          type="text"
          value={pickNumber}
          onChange={(e: any) =>
            handleChange(e.target.value, 'pickNumber', tradeNumber)
          }
        />
      </Form.Group>
      <Form.Group controlId="{`fromTeam-${tradeNumber}`}">
        <Form.Label>From</Form.Label>
        <Form.Control
          as="select"
          value={from}
          onChange={(e: any) =>
            handleChange(e.target.value, 'from', tradeNumber)
          }
        >
          {teamOptions}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="{`toTeam-${tradeNumber}`}">
        <Form.Label>To</Form.Label>
        <Form.Control
          as="select"
          value={to}
          onChange={(e: any) => handleChange(e.target.value, 'to', tradeNumber)}
        >
          {teamOptions}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="{`for-${tradeNumber}`}">
        <Form.Label>For</Form.Label>
        <Form.Control
          as="textarea"
          value={trade.for}
          onChange={(e: any) =>
            handleChange(e.target.value, 'for', tradeNumber)
          }
        />
      </Form.Group>
    </Form>
  );
};
