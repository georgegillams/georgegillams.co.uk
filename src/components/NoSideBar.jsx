import React from 'react';
import PropTypes from 'prop-types';

import STYLES from './side-bar.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const NoSideBar = (props) => {
  const {
    children, className, ...rest
  } = props;
  const classNameFinal = [getClassName('side-bar__main')];
  if (className) { classNameFinal.push(className); }

  return (
    <div className={classNameFinal.join(' ')} {...rest} >
      <div className={getClassName('side-bar__centre-column')}>
        {children}
      </div>
    </div>
  );
};

NoSideBar.propTypes = {
  className: PropTypes.string,
};

NoSideBar.defaultProps = {
  className: null,
};

export default NoSideBar;
