import React from 'react';
import PropTypes from 'prop-types';

import { StyledImage, Wrapper } from './sliding-phone.styles';
import { JS_CLASSNAME } from '@george-gillams/components/js-feature-detector';

const HIDDEN_CLASSNAME = `home__sliding-phone--hidden`;

const SlidingPhone = props => {
  const { show, lightSrc, darkSrc, imgProps, ...rest } = props;

  return (
    <Wrapper {...rest}>
      <style>
        {`.${JS_CLASSNAME} .${HIDDEN_CLASSNAME} {
        top: 6rem;
        opacity: 0;
      }`}
      </style>
      <StyledImage
        className={show ? '' : 'home__sliding-phone--hidden'}
        aspectX={1004}
        aspectY={1986}
        lightSrc={lightSrc}
        darkSrc={darkSrc}
        imgProps={imgProps}
      />
    </Wrapper>
  );
};

SlidingPhone.propTypes = {
  show: PropTypes.bool,
  className: PropTypes.string,
  lightSrc: PropTypes.string.isRequired,
  imgProps: PropTypes.object.isRequired,
  darkSrc: PropTypes.string.isRequired,
};

SlidingPhone.defaultProps = { show: false, className: null };

export default SlidingPhone;
