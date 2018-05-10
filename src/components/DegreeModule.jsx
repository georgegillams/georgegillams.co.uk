import PropTypes from 'prop-types';
import React from 'react';
import BpkProgress from 'bpk-component-progress';

import STYLES from './degree-module.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const DegreeModule = props => {
  const { name, percentage, className, ...rest } = props;

  const classNameFinal = [getClassName('degree-module')];
  if (className) {
    classNameFinal.push(className);
  }

  const percentageString = percentage ? `${percentage}%` : 'pending';

  return (
    <span className={classNameFinal.join(' ')} {...rest}>
      <span className={getClassName('degree-module--module-name')}>
        {name}: {percentageString}
      </span>
      <div className={getClassName('degree-module--module-bar')}>
        <BpkProgress
          style={{ position: 'absolute', width: '100%' }}
          small
          min={0}
          max={100}
          value={percentage || 0}
          aria-label={`Degree percentage - ${percentageString}`}
        />
        <div className={getClassName('degree-module--first-marker')} />
      </div>
    </span>
  );
};

DegreeModule.propTypes = {
  name: PropTypes.string.isRequired,
  percentage: PropTypes.number,
  className: PropTypes.string,
};

DegreeModule.defaultProps = {
  className: null,
  percentage: null,
};

export default DegreeModule;
