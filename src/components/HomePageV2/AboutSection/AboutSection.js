import React from 'react';
import PropTypes from 'prop-types';

import TextLink from 'components/common/TextLink';

import withScroll, { cleanRestScrollProps } from '@george-gillams/components/scroll-container';
import ContactLink from './ContactLink';
import { StyledParagraph, Wrapper } from './about-section.styles';

const LifeSection = props => {
  const { scrollPositionVh, ...rest } = props;

  cleanRestScrollProps(rest);

  return (
    <Wrapper {...rest}>
      <StyledParagraph>
        This site is built in{' '}
        <TextLink hrefExternal href="https://reactjs.org/">
          React
        </TextLink>{' '}
        and{' '}
        <TextLink hrefExternal href="https://redux.js.org/">
          Redux
        </TextLink>{' '}
        taking advantage of{' '}
        <TextLink hrefExternal href="https://nextjs.org/">
          Next.js
        </TextLink>
        . I serve it from an EC2 container on{' '}
        <TextLink hrefExternal href="https://aws.amazon.com/">
          AWS
        </TextLink>
        . I use it to experiment with things, share stuff I&apos;ve figured out, and allow people to contact me.
      </StyledParagraph>
      <ContactLink scrollPosition={scrollPositionVh} />
    </Wrapper>
  );
};

LifeSection.propTypes = { scrollPositionVh: PropTypes.number.isRequired };

LifeSection.defaultProps = {};

export default withScroll(LifeSection);
