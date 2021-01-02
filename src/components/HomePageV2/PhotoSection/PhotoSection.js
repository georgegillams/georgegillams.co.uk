import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import STYLES from './photo-section.scss';
import AnimatedImage from './AnimatedImage';
import { withScroll, cleanRestScrollProps } from 'gg-components/ScrollContainer';
import { cssModules } from 'gg-components/helpers/cssModules';

const getClassName = cssModules(STYLES);

const LifeSection = props => {
  const { hasBeenMostlyInView, hasBeenFullyInView, className, ...rest } = props;

  const [entryDelayDone, setEntryDelayDone] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setEntryDelayDone(true);
    }, 2000);
  }, []);

  cleanRestScrollProps(rest);

  return (
    <div className={getClassName('photo-section__outer', className)} {...rest}>
      <div className={getClassName('photo-section__content')} {...rest}>
        <AnimatedImage show={entryDelayDone && (hasBeenMostlyInView || hasBeenFullyInView)} />
      </div>
    </div>
  );
};

LifeSection.propTypes = {
  hasBeenFullyInView: PropTypes.bool.isRequired,
  hasBeenMostlyInView: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

LifeSection.defaultProps = { className: null };

export default withScroll(LifeSection);
