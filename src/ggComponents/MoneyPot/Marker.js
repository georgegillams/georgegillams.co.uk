import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';

import STYLES from './marker.module.scss';

const getClassName = cssModules(STYLES);

const Marker = props => {
  const [showPopover, setShowPopover] = useState(false);

  const { displayPercentage, hoverText, className, ...rest } = props;

  const classNames = [getClassName('marker__outer')];
  if (className) {
    classNames.push(className);
  }

  const setHover = newValue => {
    setShowPopover(newValue);
  };

  const hoverStarted = () => {
    setHover(true);
  };

  const hoverEnded = () => {
    setHover(false);
  };

  return (
    <div
      role="button"
      className={classNames.join(' ')}
      style={{
        marginLeft: `calc(${displayPercentage}% - 1rem)`,
      }}
      onMouseEnter={hoverStarted}
      onFocus={hoverStarted}
      onMouseLeave={hoverEnded}
      onBlur={hoverEnded}
      onClick={hoverStarted}
      onKeyPress={hoverStarted}
      tabIndex={0}
      {...rest}>
      {showPopover && (
        <div className={getClassName('marker__popover')}>
          <div className={getClassName('marker__popover--label')}>{hoverText}</div>
        </div>
      )}
      <div className={getClassName('marker__inner')} />
    </div>
  );
};

Marker.propTypes = {
  hoverText: PropTypes.string,
  displayPercentage: PropTypes.number,
  className: PropTypes.string,
};

Marker.defaultProps = {
  hoverText: null,
  displayPercentage: 0,
  className: null,
};

export default Marker;
