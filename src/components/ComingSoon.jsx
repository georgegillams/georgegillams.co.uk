import React from 'react';
import PropTypes from 'prop-types';
import BpkText from 'bpk-component-text';

import STYLES from './coming-soon.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const ComingSoon = (props) => {
  const {
    className, ...rest
  } = props;
  const classNameFinal = [getClassName('coming-soon__container')];
  if (className) { classNameFinal.push(className); }

  const largeTextClassNameFinal = [getClassName('coming-soon__logo-large')];

  return (
    <div className={classNameFinal.join(' ')} {...rest} >
      <BpkText textStyle="xxl" className={largeTextClassNameFinal.join(' ')} >
        {'Coming soon - Watch this space 🚀'}
      </BpkText>
    </div>
  );
};

ComingSoon.propTypes = {
  className: PropTypes.string,
};

ComingSoon.defaultProps = {
  className: null,
};

export default ComingSoon;
