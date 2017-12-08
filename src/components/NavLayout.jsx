import PropTypes from 'prop-types';
import React from 'react';
import ProfilePic from './ProfilePic';
import PersonalDetails from './PersonalDetails';
// import Navigation from './Navigation';

import STYLES from './nav-layout.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const NavLayout = (props) => {
  const { children, className, ...rest } = props;
  const classNameFinal = [getClassName('nav-layout__main')];
  if (className) { classNameFinal.push(className); }

  return (
    <div className={classNameFinal.join(' ')} {...rest} >
      <div className={getClassName('nav-layout__centre-column')}>
        <span className={getClassName('nav-layout__nav-col')}>
          <ProfilePic />
          <PersonalDetails />
          {/* <Navigation /> */}
        </span>
        <span className={getClassName('nav-layout__content-col')}>
          {children}
        </span>
      </div>
    </div>
  );
};

NavLayout.propTypes = {
  className: PropTypes.string,
};

NavLayout.defaultProps = {
  className: null,
};

NavLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NavLayout;
