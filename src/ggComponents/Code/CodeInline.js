import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';

import STYLES from './code.module.scss';

const getClassName = cssModules(STYLES);

const CodeInline = props => {
  const { children, className, inheritColor, ...rest } = props;

  const classNameFinal = [
    getClassName('code__outer-container'),
    getClassName('code__outer-container--light'),
    inheritColor && getClassName('code__outer-container--inherit-color'),
  ];
  if (className) classNameFinal.push(className);

  return (
    <span className={classNameFinal.join(' ')} {...rest}>
      {children}
    </span>
  );
};

CodeInline.propTypes = {
  inheritColor: PropTypes.bool,
  lang: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CodeInline.defaultProps = {
  inheritColor: false,
  lang: null,
  className: null,
};

export default CodeInline;
