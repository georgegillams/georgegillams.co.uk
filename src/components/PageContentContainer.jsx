import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';

import STYLES from './page-content-container.scss';

const getClassName = cssModules(STYLES);

const PageContentContainer = props => {
  const { children, className, ...rest } = props;
  const classNameFinal = [getClassName('page-content-container__main')];
  if (className) {
    classNameFinal.push(className);
  }

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      <div className={getClassName('page-content-container__centre-column')}>
        {children}
      </div>
    </div>
  );
};

PageContentContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

PageContentContainer.defaultProps = {
  children: null,
  className: null,
};

export default PageContentContainer;
