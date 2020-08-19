/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { BurgerButton } from './index';

const StatefulBurger = props => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BurgerButton
      onClick={() => {
        setIsOpen(!isOpen);
      }}
      isOpen={isOpen}
      {...props}
    />
  );
};

storiesOf('Burger button', module)
  .add('Closed', () => <BurgerButton onClick={action('burger clicked')} />)
  .add('Open', () => <BurgerButton onClick={action('burger clicked')} isOpen />)
  .add('Stateful', () => <StatefulBurger />);
