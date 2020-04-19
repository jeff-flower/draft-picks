import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import { UserTrade, buildUserTrade } from '../Firebase/util';
import { TradesData } from '../Firebase/firebase';
import { useFirebaseContext } from '../Firebase';

import './trades.css';

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
    <Container fluid>
      <Row>
        <Col>
          <h1>Your Trades</h1>
        </Col>
      </Row>
      {loading && <p>loading trades...</p>}
      {!loading && trades && (
        <>
          {trades.map((trade, index) => (
            <Row>
              <Col>
                <TradeForm
                  trade={trade}
                  tradeNumber={index}
                  teams={teams}
                  key={index}
                  handleChange={handleTradeChange}
                />
              </Col>
            </Row>
          ))}
          <Row>
            <Col>
              <Button onClick={addTrade}>Add Trade</Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
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
      <div className="trade__group">
        <h2>{`Trade ${tradeNumber + 1}`}</h2>
        <Form.Row>
          <Form.Group as={Col} xs={3} controlId="{`pickNumber-$tradeNumber`}">
            <Form.Label>PickNumber</Form.Label>
            <Form.Control
              type="text"
              value={pickNumber}
              onChange={(e: any) =>
                handleChange(e.target.value, 'pickNumber', tradeNumber)
              }
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} sm={4} controlId="{`fromTeam-$tradeNumber`}">
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
          <Form.Group as={Col} sm={4} controlId="{`toTeam-$tradeNumber`}">
            <Form.Label>To</Form.Label>
            <Form.Control
              as="select"
              value={to}
              onChange={(e: any) =>
                handleChange(e.target.value, 'to', tradeNumber)
              }
            >
              {teamOptions}
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="{`for-$tradeNumber`}">
            <Form.Label>For</Form.Label>
            <Form.Control
              as="textarea"
              value={trade.for}
              onChange={(e: any) =>
                handleChange(e.target.value, 'for', tradeNumber)
              }
            />
          </Form.Group>
        </Form.Row>
      </div>
    </Form>
  );
};
