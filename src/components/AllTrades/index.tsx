import React from 'react';
import { useFirebaseContext } from '../Firebase';
import { TradesSummary } from '../Firebase/firebase';
import { UserTrade } from '../Firebase/util';
import Table from 'react-bootstrap/Table';

export const AllTradesPage: React.FC<{}> = () => {
  const firebaseApi = useFirebaseContext();
  const [allTrades, setAllTrades] = React.useState<TradesSummary[]>([]);

  React.useEffect(() => {
    const getTrades = async () => {
      const trades = await firebaseApi.getAllTrades();
      setAllTrades(trades);
    };

    getTrades();
  }, [firebaseApi]);

  return (
    <div>
      <h1>All Trades</h1>
      {!allTrades.length && <p>loading all trades...</p>}
      {!!allTrades.length &&
        allTrades.map((allTradesForUser) => (
          <UserTrades
            key={allTradesForUser.username}
            tradesSummary={allTradesForUser}
          />
        ))}
    </div>
  );
};

const UserTrades: React.FC<{ tradesSummary: TradesSummary }> = ({
  tradesSummary,
}) => {
  const { username, trades } = tradesSummary;
  return (
    <div>
      <h2>{username}</h2>
      <TradeTable trades={trades} />
    </div>
  );
};

const TradeTable: React.FC<{ trades: UserTrade[] }> = ({ trades }) => {
  return (
    <Table bordered striped>
      <thead>
        <tr>
          <th>Pick Number</th>
          <th>From</th>
          <th>To</th>
          <th>For</th>
        </tr>
      </thead>
      <tbody>
        {trades.map((userTrade, index) => (
          <tr key={index}>
            <td>{userTrade.pickNumber}</td>
            <td>{userTrade.from}</td>
            <td>{userTrade.to}</td>
            <td>{userTrade.for}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
