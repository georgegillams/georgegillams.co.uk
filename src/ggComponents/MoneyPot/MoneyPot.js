import React from 'react';
import PropTypes from 'prop-types';

import { Progress } from '../Progress';
import { cssModules } from '../helpers/cssModules';

import Marker from './Marker';
import STYLES from './money-pot.module.scss';

const getClassName = cssModules(STYLES);

const MoneyPot = props => {
  const { name, balance, filled, goalAmount, markerPosition, shortfall, className, ...rest } = props;

  const markerDisplayPercentage = Math.min(100, Math.round((100 * markerPosition) / goalAmount));
  const balancePercentage = Math.min(100, Math.round((100 * balance) / goalAmount));
  const showPercentageValue = filled && balancePercentage && balancePercentage > 0.01;

  const classNameFinal = [getClassName('money-pot')];
  if (className) {
    classNameFinal.push(className);
  }

  const progress = (
    <Progress
      style={{ position: 'absolute', width: '100%', top: '-.2rem' }}
      max={100}
      progress={filled ? balancePercentage : 0}
      error={shortfall > 0}
    />
  );

  return (
    <span className={classNameFinal.join(' ')} {...rest}>
      <span className={getClassName('money-pot__name')}>{name}</span>
      {balance !== null && (
        <span className={getClassName('money-pot__name')}>
          {`£${balance}`}
          {goalAmount !== null ? ` of £${goalAmount}` : ''}
        </span>
      )}
      <div className={getClassName('money-pot__bar')}>
        {progress}
        {markerPosition !== null && (
          <Marker
            displayPercentage={markerDisplayPercentage}
            hoverText={`£${(markerDisplayPercentage * goalAmount) / 100}`}
          />
        )}
      </div>
      <span className={getClassName('money-pot__percentage')} style={{ opacity: showPercentageValue ? 1 : 0 }}>{`${
        balancePercentage || '00'
      }%`}</span>
    </span>
  );
};

MoneyPot.propTypes = {
  name: PropTypes.string.isRequired,
  shortfall: PropTypes.number,
  balance: PropTypes.number,
  goalAmount: PropTypes.number,
  filled: PropTypes.bool,
  className: PropTypes.string,
  markerPosition: PropTypes.number,
};

MoneyPot.defaultProps = {
  filled: true,
  shortfall: 0,
  balance: null,
  goalAmount: null,
  className: null,
  markerPosition: null,
};

export default MoneyPot;
