import React from 'react';
import PropTypes from 'prop-types';
import BpkText from 'bpk-component-text';

import STYLES from './app.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const ComingSoon = (props) => {
  const { className, ...rest } = props;
  const classNameFinal = [getClassName('app__big-picture-text')];
  if (className) { classNameFinal.push(className); }

  return (
    <BpkText tagName="h2" textStyle="xxl" className={classNameFinal.join(' ')} {...rest}>
    Site Coming Soon...
    </BpkText>
  );
};

ComingSoon.propTypes = {
  className: PropTypes.string,
};

ComingSoon.defaultProps = {
  className: null,
};

export default ComingSoon;
