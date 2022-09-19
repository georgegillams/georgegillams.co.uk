import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Cloud, Content, StyledTextLink, Wrapper } from './contact-link.styles';
import { NO_JS_CLASSNAME } from '@george-gillams/components/js-feature-detector';

const HIDDEN_CLASSNAME = 'home__contact--hide';

const ContactLink = props => {
  const { scrollPosition, ...rest } = props;
  const [hovering, setHovering] = useState(false);
  const hide = hovering;

  // We want to adjust the value to be always between 14 and 300
  const normalisedUpper = 300;
  const normalisedLower = 14;
  const scrollPositionFactor = 100 - Math.min(100, Math.max(0, scrollPosition));
  const scrollPositionNormalised = normalisedLower + ((normalisedUpper - normalisedLower) * scrollPositionFactor) / 100;

  return (
    <Wrapper {...rest}>
      <style>
        {`
        .${NO_JS_CLASSNAME} .${HIDDEN_CLASSNAME} {
        display: none;
        }`}
      </style>
      <Content
        onMouseEnter={() => {
          setHovering(true);
        }}
        onMouseLeave={() => {
          setHovering(false);
        }}>
        <StyledTextLink href="/contact">Get in touch</StyledTextLink>
        <Cloud className={HIDDEN_CLASSNAME} style={{ left: hide ? '120%' : `${scrollPositionNormalised}%` }} />
      </Content>
    </Wrapper>
  );
};

ContactLink.propTypes = {
  scrollPosition: PropTypes.number.isRequired,
  className: PropTypes.string,
};

ContactLink.defaultProps = { className: null };

export default ContactLink;
