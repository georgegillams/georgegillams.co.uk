import React from 'react';
import PropTypes from 'prop-types';

import withScroll, { cleanRestScrollProps } from '@george-gillams/components/scroll-container';
import TextLink from 'components/common/TextLink';
import { AnimatedWrapperInner, AnimatedWrapperOuter, Content, StyledParagraph, Wrapper } from './work-section.styles';
import { breakpointSm } from '@george-gillams/components/constants/layout';
import { JS_CLASSNAME } from '@george-gillams/components/js-feature-detector';
import FakeTypeform from './fake-typeform';

const HIDE_CLASS_NAME = `home-page-work-seciton__typeform--hide`;

const WorkSection = props => {
  const { hasBeenMostlyInView, hasBeenFullyInView, ...rest } = props;

  cleanRestScrollProps(rest);

  return (
    <Wrapper {...rest}>
      <style>
        {`
          .${JS_CLASSNAME} .${HIDE_CLASS_NAME} {
            left: 10rem;
            opacity: 0;
          }

          @media (min-width: ${breakpointSm}) {
            .${JS_CLASSNAME} .${HIDE_CLASS_NAME} {
              left: 4rem;
              opacity: 0;
            }
          }
          `}
      </style>
      <Content>
        <StyledParagraph>
          I&#39;m an Expert Software Engineer at{' '}
          <TextLink hrefExternal href="https://typeform.com/">
            Typeform
          </TextLink>
          .
          <br />
          I’m also an accessibility champion and design system enthusiast.
          <br />
          <TextLink href="/work">Learn more about my work</TextLink>
        </StyledParagraph>
      </Content>
      <AnimatedWrapperOuter>
        <AnimatedWrapperInner className={hasBeenMostlyInView || hasBeenFullyInView ? '' : HIDE_CLASS_NAME}>
          <FakeTypeform
            questionTitle="Where to next?"
            links={[
              { text: 'My work', href: '/work' },
              { text: 'Typeform', href: 'https://typeform.com' },
            ]}
          />
        </AnimatedWrapperInner>
      </AnimatedWrapperOuter>
    </Wrapper>
  );
};

WorkSection.propTypes = {
  hasBeenMostlyInView: PropTypes.bool.isRequired,
  hasBeenFullyInView: PropTypes.bool.isRequired,
};

WorkSection.defaultProps = { className: null };

export default withScroll(WorkSection);
