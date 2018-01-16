import React from 'react';
import PropTypes from 'prop-types';
import SubSection from './SubSection';
// import BpkImage, { withLazyLoading, withLoadingBehavior } from 'bpk-component-image';
import githubIcon from './../icons/github.png';

// import skyscannerIcon from './../icons/skyscanner.png';

import STYLES from './tech-specs.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';
// const documentIfExists = typeof window !== 'undefined' ? document : null;
// const FadingLazyLoadedImage = withLoadingBehavior(withLazyLoading(BpkImage, documentIfExists));

const TechSpecs = (props) => {
  const {
    light, className, children, alwaysCentered, ...rest
  } = props;
  const outerClassNameFinal = [];
  if (className) { outerClassNameFinal(className); }

  const containerClassNameFinal = [getClassName('get-social__container')];
  if (alwaysCentered) { containerClassNameFinal.push(getClassName('get-social__container--centered')); }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest} >
      <SubSection light={light} noPadding name="Built in React" />
      <SubSection light={light} noPadding name="Hosted on GitHub" />
      <SubSection light={light} noPadding name="Data on restdb.io" />
    </div>
  );
};

TechSpecs.propTypes = {
  className: PropTypes.string,
  alwaysCentered: PropTypes.bool,
};

TechSpecs.defaultProps = {
  className: null,
  alwaysCentered: false,
};

export default TechSpecs;
