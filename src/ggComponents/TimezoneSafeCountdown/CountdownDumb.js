import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';
import { getTimeDifferenceFromMilliseconds } from '../helpers/time';
import { Paragraph } from '../Paragraph';
import { Checkbox } from '../Checkbox';

import STYLES from './countdown.module.scss';
import CountdownItem from './CountdownItem';
import CountdownDivider from './CountdownDivider';

const getClassName = cssModules(STYLES);

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = MS_PER_SECOND * 60;
const MS_PER_HOUR = MS_PER_MINUTE * 60;
const MS_PER_DAY = MS_PER_HOUR * 24;

const absFloor = num => {
  if (num > 0) {
    return Math.floor(num);
  }
  return Math.ceil(num);
};

const CountdownDumb = props => {
  const { millis, textClassName, className, completeMessage, large, paused, onPauseChanged, ...rest } = props;

  let msLeft = millis;
  const daysLeft = absFloor(msLeft / MS_PER_DAY);
  msLeft -= daysLeft * MS_PER_DAY;
  const hoursLeft = absFloor(msLeft / MS_PER_HOUR);
  msLeft -= hoursLeft * MS_PER_HOUR;
  const minutesLeft = absFloor(msLeft / MS_PER_MINUTE);
  msLeft -= minutesLeft * MS_PER_MINUTE;
  const secondsLeft = absFloor(msLeft / MS_PER_SECOND);
  msLeft -= secondsLeft * MS_PER_SECOND;

  const timeDifferenceFriendly = getTimeDifferenceFromMilliseconds(millis);
  let accessibleLabel = `Timer ends ${timeDifferenceFriendly}`;
  if (millis <= 0) {
    accessibleLabel = `Timer ended ${timeDifferenceFriendly}`;
  }

  let component = (
    <div aria-label={accessibleLabel} className={getClassName('countdown__clockOuter')}>
      {millis <= 0 && (
        <Paragraph className={[getClassName('countdown__itemNumber'), textClassName].join(' ')}>-</Paragraph>
      )}
      {daysLeft !== 0 && (
        <>
          <CountdownItem textClassName={textClassName} name="DAYS" number={Math.abs(daysLeft)} />
          <CountdownDivider textClassName={textClassName} />
        </>
      )}
      <CountdownItem textClassName={textClassName} name="HOURS" number={Math.abs(hoursLeft)} />
      <CountdownDivider textClassName={textClassName} />
      <CountdownItem textClassName={textClassName} name="MINUTES" number={Math.abs(minutesLeft)} />
      <CountdownDivider textClassName={textClassName} />
      <CountdownItem textClassName={textClassName} name="SECONDS" number={Math.abs(secondsLeft)} />
    </div>
  );

  if (paused) {
    component = (
      <Paragraph className={getClassName('countdown__pausedLabel', textClassName)}>{accessibleLabel}</Paragraph>
    );
  }

  if (millis <= 0 && completeMessage) {
    component = (
      <Paragraph className={getClassName('countdown__pausedLabel', textClassName)}>{completeMessage}</Paragraph>
    );
  }

  return (
    <div className={getClassName('countdown__outer', className)} {...rest}>
      {component}
      <Checkbox
        checked={paused}
        name="pause_checkbox"
        label="Reduce motion"
        onChange={e => {
          if (onPauseChanged) {
            onPauseChanged(e.target.checked);
          }
        }}
      />
    </div>
  );
};

CountdownDumb.propTypes = {
  millis: PropTypes.string.isRequired,
  className: PropTypes.string,
  completeMessage: PropTypes.string,
  textClassName: PropTypes.string,
  onPauseChanged: PropTypes.func,
  large: PropTypes.bool,
  paused: PropTypes.bool,
};

CountdownDumb.defaultProps = {
  className: null,
  completeMessage: null,
  large: false,
  paused: false,
  onPauseChanged: null,
  textClassName: null,
};

export default CountdownDumb;
