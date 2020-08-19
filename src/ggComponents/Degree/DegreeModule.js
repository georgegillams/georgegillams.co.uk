import React from 'react';
import PropTypes from 'prop-types';

import { Progress } from '../Progress';
import { cssModules } from '../helpers/cssModules';

import STYLES from './degree-module.module.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const DegreeModule = props => {
  const { name, markerPosition, percentage, filled, className, ...rest } = props;

  const classNameFinal = [getClassName('degree-module')];
  if (className) {
    classNameFinal.push(className);
  }

  const progress = (
    <Progress
      style={{ position: 'absolute', width: '100%', top: '-.2rem' }}
      progress={filled ? percentage || 0 : 0}
      aria-label={`Degree percentage - ${percentage ? `${percentage}%` : 'pending'}`}
    />
  );

  return (
    <span className={classNameFinal.join(' ')} {...rest}>
      <span className={getClassName('degree-module--module-name')}>{name}</span>
      <div className={getClassName('degree-module--module-bar')}>
        {progress}
        {markerPosition && (
          <div
            className={getClassName('degree-module--21-marker')}
            style={{ marginLeft: `calc(${markerPosition}% - .175rem)` }}
          />
        )}
      </div>
      <span
        className={getClassName('degree-module--percentage')}
        style={{ opacity: filled && percentage && percentage > 0.01 ? 1 : 0 }}>
        {`${percentage || '00'}%`}
      </span>
    </span>
  );
};

DegreeModule.propTypes = {
  name: PropTypes.string.isRequired,
  percentage: PropTypes.number,
  filled: PropTypes.bool,
  className: PropTypes.string,
  markerPosition: PropTypes.number,
};

DegreeModule.defaultProps = {
  filled: true,
  className: null,
  percentage: null,
  markerPosition: null,
};

export default DegreeModule;
