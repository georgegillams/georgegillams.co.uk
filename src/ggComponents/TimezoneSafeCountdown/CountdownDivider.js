import React from 'react';
import PropTypes from 'prop-types';

import { Paragraph } from '../Paragraph';
import { cssModules } from '../helpers/cssModules';

import STYLES from './countdown.module.scss';

const getClassName = cssModules(STYLES);

const CountdownDivider = props => {
  const { textClassName, className, ...rest } = props;

  const classNames = [getClassName('countdown__divider', className), textClassName];

  return (
    <Paragraph aria-hidden="true" className={classNames.join(' ')} {...rest}>
      :
    </Paragraph>
  );
};

CountdownDivider.propTypes = {
  className: PropTypes.string,
  textClassName: PropTypes.string,
};

CountdownDivider.defaultProps = {
  className: null,
  textClassName: null,
};

export default CountdownDivider;
