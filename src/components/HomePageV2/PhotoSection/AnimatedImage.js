import React from 'react';
import PropTypes from 'prop-types';

import { StyledImage, Wrapper } from './animated-image.styles';
import { JS_CLASSNAME } from '@george-gillams/components/js-feature-detector';

const HIDDEN_CLASSNAME = 'home__animated-image--hidden';

const AnimatedImage = props => {
  const { show, ...rest } = props;

  return (
    <Wrapper {...rest}>
      <style>
        {`.${JS_CLASSNAME} .${HIDDEN_CLASSNAME} {
            top: 6rem;
            opacity: 0;
          }`}
      </style>
      <StyledImage
        className={show ? '' : HIDDEN_CLASSNAME}
        imgProps={{
          alt: 'Me',
        }}
        aspectX={4667}
        aspectY={3304}
        lightSrc="https://i.imgur.com/L0Rm1ZC.jpg"
        darkSrc="https://i.imgur.com/L0Rm1ZC.jpg"
      />
    </Wrapper>
  );
};

AnimatedImage.propTypes = { show: PropTypes.bool.isRequired };

export default AnimatedImage;
