import React from 'react';

export const RulesPage = () => {
  return (
    <>
      <h1>Rules</h1>
      <section>
        <h2>Picks</h2>
        <p>
          For every selection you make that gets picked in the first round you
          will receive 2 points plus an amount based off a tiered structure.
        </p>
        <ol>
          <li>Picks 1-10 will receive 5 additional points</li>
          <li>Picks 11-20 will receive 10 additional points</li>
          <li>Picks 21-31 will receive 15 additional points</li>
        </ol>
        <p>
          Additionally, if you get the pick exactly right (pick number and
          player) you get a bonus equal to the pick number.
        </p>
      </section>
      <section>
        <h2>Trades</h2>
        <p>
          You can project trades between teams. If you project a trade between
          teams correctly you will receive an additional 20 points. (You do not
          need to get all compensation correct to get the trade accurate.
          However, trade compensation must be listed for a trade to be
          accepted.) First 7 trades free.
        </p>
      </section>
      <section>
        <h2>Ties</h2>
        <p>
          In the event of a tie, total picks correct will be the tie breaker
        </p>
      </section>
    </>
  );
};

/*
    Picks 1-10 will receive 5 additional points, picks 11-20 will receive 10 additional points, picks 21-31 will receive 15 additional points
    Projecting Trades:     
*/
