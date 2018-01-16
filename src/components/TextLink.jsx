import PropTypes from 'prop-types';
import React from 'react';
import BpkText from 'bpk-component-text';

import STYLES from './section.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const TextLink = (props) => {
  const {
    fancy, light, noPadding, className, children, ...rest
  } = props;

  const textClassNameFinal = [getClassName('section__section--text')];
  textClassNameFinal.push(getClassName('section__section--text--link'));
  if (light) {
    textClassNameFinal.push(getClassName('section__section--text--light'));
    textClassNameFinal.push(getClassName('section__section--text--light--link'));
  }
  if (noPadding) {
    textClassNameFinal.push(getClassName('section__sub-section--text--no-padding'));
  }
  if (fancy) textClassNameFinal.push(getClassName('section__section--text--fancy'));
  if (className) { textClassNameFinal.push(className); }

  return (
    <BpkText tagName="h2" className={textClassNameFinal.join(' ')}>
      {children}
    </BpkText>
  );
};

TextLink.propTypes = {
  children: PropTypes.node,
};

TextLink.defaultProps = {
  children: null,
};

export default TextLink;
