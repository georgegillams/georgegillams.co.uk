import PropTypes from 'prop-types';
import React from 'react';

import STYLES from './nav-layout.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const NavLayout = (props) => {
  const {
    children1, children2, className, ...rest
  } = props;
  const classNameFinal = [getClassName('nav-layout__main')];
  if (className) { classNameFinal.push(className); }

  return (
    <div className={classNameFinal.join(' ')} {...rest} >
      <div className={getClassName('nav-layout__centre-column')}>
        <span className={getClassName('nav-layout__nav-col')}>
          {children1}
        </span>
        <span className={getClassName('nav-layout__content-col')}>
          {children2}
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
  children1: PropTypes.node.isRequired,
  children2: PropTypes.node.isRequired,
};

export default NavLayout;
