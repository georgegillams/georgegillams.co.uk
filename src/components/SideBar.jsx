import React from 'react';
import PropTypes from 'prop-types';

import Logo from './Logo';
import PersonalDetails from './PersonalDetails';

import STYLES from './side-bar.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const SideBar = (props) => {
  const {
    children, className, ...rest
  } = props;
  const classNameFinal = [getClassName('side-bar__main')];
  if (className) { classNameFinal.push(className); }

  return (
    <div className={classNameFinal.join(' ')} {...rest} >
      <div className={getClassName('side-bar__centre-column')}>
        <span className={getClassName('side-bar__nav-col')}>
          <Logo />
          <PersonalDetails />
        </span>
        <span className={getClassName('side-bar__content-col')}>
          {children}
        </span>
      </div>
    </div>
  );
};

SideBar.propTypes = {
  className: PropTypes.string,
};

SideBar.defaultProps = {
  className: null,
};

export default SideBar;
