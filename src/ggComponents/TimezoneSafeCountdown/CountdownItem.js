import React from 'react';
import PropTypes from 'prop-types';

import { Paragraph } from '../Paragraph';
import { cssModules } from '../helpers/cssModules';

import STYLES from './countdown.module.scss';

const getClassName = cssModules(STYLES);

const CountdownItem = props => {
  const { name, number, textClassName, className, ...rest } = props;

  const classNames = [getClassName('countdown__item', className)];

  return (
    <div aria-hidden="true" className={classNames.join(' ')} {...rest}>
      <Paragraph className={getClassName('countdown__itemNumber', textClassName)}>{number}</Paragraph>
      <Paragraph className={getClassName('countdown__itemName', textClassName)}>{name}</Paragraph>
    </div>
  );
};

CountdownItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  className: PropTypes.string,
  textClassName: PropTypes.string,
};

CountdownItem.defaultProps = {
  className: null,
  textClassName: null,
};

export default CountdownItem;
