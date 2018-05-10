import PropTypes from 'prop-types';
import React from 'react';
import BpkProgress, {
  themeAttributes as progressThemeAttributes,
} from 'bpk-component-progress';
import BpkThemeProvider from 'bpk-theming';

import STYLES from './degree-module.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const DegreeModule = props => {
  const { name, percentage, className, ...rest } = props;

  const classNameFinal = [getClassName('degree-module')];
  if (className) {
    classNameFinal.push(className);
  }

  return (
    <span className={classNameFinal.join(' ')} {...rest}>
      <span className={getClassName('degree-module--module-name')}>{name}</span>
      <div className={getClassName('degree-module--module-bar')}>
        <BpkThemeProvider
          theme={{ progressBarFillColor: '#44aeff' }}
          themeAttributes={[...progressThemeAttributes]}
        >
          <BpkProgress
            style={{ position: 'absolute', width: '100%', top: '-.2rem' }}
            small
            min={0}
            max={100}
            value={percentage || 0}
            aria-label={`Degree percentage - ${
              percentage ? `${percentage}%` : 'pending'
            }`}
          />{' '}
        </BpkThemeProvider>
        <div className={getClassName('degree-module--first-marker')} />
      </div>
      <span
        className={getClassName('degree-module--percentage')}
        style={{ opacity: percentage && percentage > 0.01 ? 1 : 0 }}
      >{`${percentage || '00'}%`}</span>
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
