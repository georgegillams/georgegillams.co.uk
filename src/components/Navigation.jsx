import React from 'react';
import PropTypes from 'prop-types';

import STYLES from './navigation.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const Navigation = (props) => {
  const { className, ...rest } = props;
  const classNameFinal = [getClassName('navigation__container')];
  if (className) { classNameFinal.push(className); }

  return (
    <div className={classNameFinal.join(' ')} {...rest} >
      <a className={getClassName('navigation__link')} href="/">Home</a>
      <a className={getClassName('navigation__link')} href="/contact">Contact</a>
    </div>
  );
};

Navigation.propTypes = {
  className: PropTypes.string,
};

Navigation.defaultProps = {
  className: null,
};

export default Navigation;
