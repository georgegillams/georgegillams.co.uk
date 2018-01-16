import React from 'react';
import PropTypes from 'prop-types';

import STYLES from './page-content-container.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const NoSideBar = (props) => {
  const {
    children, className, ...rest
  } = props;
  const classNameFinal = [getClassName('page-content-container__main')];
  if (className) { classNameFinal.push(className); }

  return (
    <div className={classNameFinal.join(' ')} {...rest} >
      <div className={getClassName('page-content-container__centre-column')}>
        {children}
      </div>
    </div>
  );
};

NoSideBar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

NoSideBar.defaultProps = {
  children: null,
  className: null,
};

export default NoSideBar;
