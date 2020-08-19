import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';

import STYLES from './error.module.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const Error = props => {
  const { className, ...rest } = props;

  return <span className={getClassName('error', className)} {...rest} />;
};

Error.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Error.defaultProps = {
  children: null,
  className: null,
};

export default Error;
