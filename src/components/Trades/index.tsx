import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

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

  const handleDeleteTrade = (tradeNumber: number) => {
    setTrades((oldTrades) =>
      oldTrades.filter((trade, index) => index !== tradeNumber)
    );
  };

  const handleSaveTrades = async () => {
    if (!saving) {
      setSaving(true);
      const result = await firebaseApi.saveTradesDataForUser(trades);
      setSaving(false);
      if (result.hasError) {
        console.log('error saving trades', result.error);
      } else {
        console.log('success saving trades');
      }
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Your Trades</h1>
        </Col>
      </Row>
      {loading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      {!loading && trades && (
        <>
          {trades.map((trade, index) => (
            <Row key={index}>
              <Col>
                <TradeForm
                  trade={trade}
                  tradeNumber={index}
                  teams={teams}
                  handleDelete={handleDeleteTrade}
                  handleChange={handleTradeChange}
                />
              </Col>
            </Row>
          ))}
          <Row>
            <Col xs={4} sm={3}>
              <Button variant="outline-secondary" onClick={addTrade}>
                +
              </Button>
            </Col>
            <Col xs={8} sm={{ span: 3, offset: 6 }}>
              <Button onClick={handleSaveTrades} disabled={saving}>
                {!saving && <span>Save Trades</span>}
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
  handleDelete: (tradeNumber: number) => void;
  handleChange: (
    value: string,
    type: keyof UserTrade,
    tradeNumber: number
  ) => void;
}> = ({ trade, tradeNumber, teams, handleChange, handleDelete }) => {
  const { pickNumber, from, to } = trade;

  const teamOptions = teams.map((team, index) => (
    <option key={index} value={team}>
      {team}
    </option>
  ));
  return (
    <Form>
      <div className="trade-group">
        <Form.Row>
          <div className="trade-group__header">
            <h2>{`Trade ${tradeNumber + 1}`}</h2>
            <Button
              variant="outline-danger"
              onClick={() => handleDelete(tradeNumber)}
            >
              Delete
            </Button>
          </div>
        </Form.Row>

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
          <Form.Group as={Col} sm={3} controlId="{`fromTeam-$tradeNumber`}">
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
          <Form.Group as={Col} sm={3} controlId="{`toTeam-$tradeNumber`}">
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
          <Form.Group as={Col} md={6} controlId="{`for-$tradeNumber`}">
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
