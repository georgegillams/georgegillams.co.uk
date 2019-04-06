import React from 'react';
import PropTypes from 'prop-types';

import STYLES from './code.scss'; import {cssModules} from 'bpk-react-utils';  const getClassName = cssModules(STYLES); // REGEX_REPLACED

const CodeBashArrow = props => (
  <span {...props} className={getClassName("code__bash-arrow")}>
    {'▶ '}
  </span>
);

CodeBashArrow.propTypes = {
  lang: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CodeBashArrow.defaultProps = {
  lang: null,
  className: null,
};

export default CodeBashArrow;
