import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { MoneyPot } from './index';

const INTERACTIVE_INCREMENT = 1300;

const StatefulMoneyPot = props => {
  const [expected, setExpected] = useState(0);
  const [balance, setBalance] = useState(0);

  return (
    <div>
      <MoneyPot
        name="Test"
        balance={balance}
        goalAmount={6000}
        markerPosition={expected}
        shortfall={expected - balance}
        {...props}
      />
      {expected < 6500 && (
        <button
          type="button"
          onClick={() => {
            setExpected(expected + INTERACTIVE_INCREMENT);
          }}>
          Increment expected amount
        </button>
      )}
      {expected >= 6500 && (
        <button
          type="button"
          onClick={() => {
            setExpected(0);
          }}>
          Reset expected amount
        </button>
      )}
      {balance < 6500 && (
        <button
          type="button"
          onClick={() => {
            setBalance(balance + INTERACTIVE_INCREMENT);
          }}>
          Increment balance
        </button>
      )}
      {balance >= 6500 && (
        <button
          type="button"
          onClick={() => {
            setBalance(0);
          }}>
          Reset balance
        </button>
      )}
    </div>
  );
};

storiesOf('Money pot', module)
  .add('Default', () => <MoneyPot name="Test" balance={50} goalAmount={70} markerPosition={40} />)
  .add('Shortfall', () => <MoneyPot name="Test" shortfall={20} balance={50} goalAmount={70} markerPosition={56} />)
  .add('Stateful', () => <StatefulMoneyPot />);
