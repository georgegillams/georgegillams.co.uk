import React from 'react';
import PropTypes from 'prop-types';

import withScroll, { cleanRestScrollProps } from '@george-gillams/components/scroll-container';
import Section from '@george-gillams/components/section';
import TextLink from 'components/common/TextLink';
import { Content, Graphic, StyledParagraph, Wrapper } from './work-section.styles';

const WorkSection = props => {
  const { hasBeenMostlyInView, hasBeenFullyInView, ...rest } = props;

  cleanRestScrollProps(rest);

  return (
    <Wrapper {...rest}>
      <Content>
        <Section name="Work">
          <StyledParagraph>
            I&#39;m a web developer at{' '}
            <TextLink hrefExternal href="https://typeform.com/">
              Typeform
            </TextLink>{' '}
            .
            <br />
            I’m also an accessibility champion and design system enthusiast.
            <br />
            <TextLink href="/work">Learn more about my work</TextLink>
          </StyledParagraph>
        </Section>
      </Content>
      <Graphic hasBeenMostlyInView={hasBeenMostlyInView || hasBeenFullyInView} />
    </Wrapper>
  );
};

WorkSection.propTypes = {
  hasBeenMostlyInView: PropTypes.bool.isRequired,
  hasBeenFullyInView: PropTypes.bool.isRequired,
};

WorkSection.defaultProps = { className: null };

export default withScroll(WorkSection);
