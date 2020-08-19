import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';
import { Subsection } from '../Subsection';

import STYLES from './style.module.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const LoadingIndicator = props => {
  const { loading, error, children, ...rest } = props;

  if (!loading && !error) {
    return children;
  }

  return (
    <div className={getClassName('loading-indicator__outer')} {...rest}>
      <div className={getClassName('loading-indicator')}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
      {error && <Subsection anchor={false} name="This is taking a while. Maybe something isn't quite right..." />}
    </div>
  );
};

LoadingIndicator.propTypes = {
  loading: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  error: PropTypes.object,
  children: PropTypes.node,
};

LoadingIndicator.defaultProps = {
  loading: true,
  error: null,
  children: null,
};

export default LoadingIndicator;
