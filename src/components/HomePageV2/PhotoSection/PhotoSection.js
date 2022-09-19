import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import AnimatedImage from './AnimatedImage';
import withScroll, { cleanRestScrollProps } from '@george-gillams/components/scroll-container';
import { Content, Wrapper } from './photo-section.styles';

const LifeSection = props => {
  const { hasBeenMostlyInView, hasBeenFullyInView, ...rest } = props;

  const [entryDelayDone, setEntryDelayDone] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setEntryDelayDone(true);
    }, 2000);
  }, []);

  cleanRestScrollProps(rest);

  return (
    <Wrapper {...rest}>
      <Content>
        <AnimatedImage show={entryDelayDone && (hasBeenMostlyInView || hasBeenFullyInView)} />
      </Content>
    </Wrapper>
  );
};

LifeSection.propTypes = {
  hasBeenFullyInView: PropTypes.bool.isRequired,
  hasBeenMostlyInView: PropTypes.bool.isRequired,
};

export default withScroll(LifeSection);
