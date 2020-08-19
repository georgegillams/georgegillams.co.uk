/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { cssModules } from '../helpers/cssModules';

import STYLES from './stories.module.scss';

import { Checkbox } from './index';

const getClassName = cssModules(STYLES);

const StatefulCheckbox = props => {
  // eslint-disable-next-line react/destructuring-assignment
  const [checked, setChecked] = useState(props.checked);
  const [valid, setValid] = useState(null);
  const [disabled, setDisabled] = useState(false);

  return (
    <div>
      <Checkbox
        name="Stateful_checkbox"
        valid={valid}
        checked={checked}
        disabled={disabled}
        onChange={e => setChecked(e.target.checked)}
        {...props}
      />
      {!disabled && (
        <button
          type="button"
          onClick={() => {
            setDisabled(true);
          }}>
          Disable
        </button>
      )}
      {disabled && (
        <button
          type="button"
          onClick={() => {
            setDisabled(false);
          }}>
          Enable
        </button>
      )}
      {valid !== true && (
        <button
          type="button"
          onClick={() => {
            setValid(true);
          }}>
          Valid
        </button>
      )}
      {valid !== false && (
        <button
          type="button"
          onClick={() => {
            setValid(false);
          }}>
          Invalid
        </button>
      )}
      {valid !== null && (
        <button
          type="button"
          onClick={() => {
            setValid(null);
          }}>
          Reset validation
        </button>
      )}
    </div>
  );
};

storiesOf('Checkbox', module)
  .add('Default', () => <Checkbox label="Test" name="Test" />)
  .add('No label', () => <Checkbox name="Test" />)
  .add('Valid', () => <Checkbox label="Test" name="Test" valid />)
  .add('Invalid', () => <Checkbox label="Test" name="Test" valid={false} />)
  .add('Disabled', () => <Checkbox label="Test" name="Test" disabled />)
  .add('No label checked', () => <Checkbox checked name="Test" />)
  .add('Valid checked', () => <Checkbox checked label="Test" name="Test" valid />)
  .add('Invalid checked', () => <Checkbox checked label="Test" name="Test" valid={false} />)
  .add('Disabled checked', () => <Checkbox checked label="Test" name="Test" disabled />)
  .add('Themed', () => (
    <div className={getClassName('stories__themed')}>
      <Checkbox checked label="Test" name="Test" />
    </div>
  ))
  .add('Stateful', () => <StatefulCheckbox label="Test" />);
