import PropTypes from 'prop-types';
import React from 'react';
import BpkProgress, {
  themeAttributes as progressThemeAttributes,
} from 'bpk-component-progress';
import BpkThemeProvider from 'bpk-theming';

import STYLES from './degree-module.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const DegreeModule = props => {
  const { name, predicted, percentage, filled, className, ...rest } = props;

  const classNameFinal = [getClassName('degree-module')];
  if (className) {
    classNameFinal.push(className);
  }

  let progress = (
    <BpkProgress
      style={{ position: 'absolute', width: '100%', top: '-.2rem' }}
      small
      min={0}
      max={100}
      value={filled ? percentage || 0 : 0}
      aria-label={`Degree percentage - ${
        percentage ? `${percentage}%` : 'pending'
      }`}
    />
  );

  if (predicted) {
    progress = (
      <BpkThemeProvider
        theme={{ progressBarFillColor: '#e02626' }}
        themeAttributes={[...progressThemeAttributes]}
      >
        {progress}
      </BpkThemeProvider>
    );
  } else {
    progress = (
      <BpkThemeProvider
        theme={{ progressBarFillColor: '#44aeff' }}
        themeAttributes={[...progressThemeAttributes]}
      >
        {progress}
      </BpkThemeProvider>
    );
  }

  return (
    <span className={classNameFinal.join(' ')} {...rest}>
      <span className={getClassName('degree-module--module-name')}>{name}</span>
      <div className={getClassName('degree-module--module-bar')}>
        {progress}
        <div className={getClassName('degree-module--21-marker')} />
        {/* <div className={getClassName('degree-module--first-marker')} /> */}
      </div>
      <span
        className={getClassName('degree-module--percentage')}
        style={{ opacity: filled && percentage && percentage > 0.01 ? 1 : 0 }}
      >{`${percentage || '00'}%`}</span>
    </span>
  );
};

DegreeModule.propTypes = {
  name: PropTypes.string.isRequired,
  percentage: PropTypes.number,
  predicted: PropTypes.bool,
  filled: PropTypes.bool,
  className: PropTypes.string,
};

DegreeModule.defaultProps = {
  filled: false,
  predicted: false,
  className: null,
  percentage: null,
};

export default DegreeModule;
