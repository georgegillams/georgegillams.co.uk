import React from 'react';
import PropTypes from 'prop-types';

import withScroll, { cleanRestScrollProps } from '@george-gillams/components/scroll-container';
import Text, { SIZES } from '@george-gillams/components/text';
import TextLink from 'components/common/TextLink';
import { Content, StyledParagraph, Wrapper } from './work-section.styles';
import styled from 'styled-components';
import {
  borderRadiusSm,
  breakpointMd,
  breakpointSm,
  spacingBase,
  spacingLg,
  spacingSm,
  spacingXs,
} from '@george-gillams/components/constants/layout';
import { notBlack, primaryColor, primaryColorDark } from '@george-gillams/components/constants/colors';
import { JS_CLASSNAME } from '@george-gillams/components/js-feature-detector';

export const TFWrapper = styled.div`
  width: 24rem;
  text-align: left;
  height: 16rem;
  background: ${primaryColor};
  padding: ${spacingLg};
  border-radius: ${borderRadiusSm};
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (prefers-color-scheme: dark) {
    background: ${primaryColorDark};
  }

  @media (min-width: ${breakpointSm}) {
    padding: calc(2 * ${spacingLg});
  }
`;

export const TFOptionLink = styled.a`
  padding: ${spacingXs};
  background: rgba(0, 0, 0, 0.1);
  border-radius: 0.2rem;
  outline: ${notBlack} solid 1px;
  color: ${notBlack};
  text-decoration: none;
  display: flex;
  transition: background 0.2s ease;
  min-width: calc(4 * ${spacingLg});
  align-items: center;

  @media (prefers-color-scheme: dark) {
    background: rgba(255, 255, 255, 0.2);
    outline-color: white;
    color: white;
  }

  &:hover,
  &:focus,
  &:active {
    background: rgba(0, 0, 0, 0.2);
    outline-width: 2px;

    @media (prefers-color-scheme: dark) {
      background: rgba(255, 255, 255, 0.4);
    }
  }
`;

export const TFOptionsWrapper = styled.div`
  margin-top: ${spacingBase};
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > * {
    margin-top: ${spacingBase};
  }
`;

const indexToLetter = index => {
  return String.fromCharCode(65 + index);
};

const OptionText = styled(Text)`
  padding-top: 0.1rem;
`;

export const TFAnswerLetter = styled.div`
  padding-top: 0.1rem;
  width: 1.2rem;
  height: 1.2rem;
  background: rgba(255, 255, 255, 0.14);
  border-radius: 0.2rem;
  outline: ${notBlack} solid 1px;
  margin-right: ${spacingSm};
  display: flex;
  justify-content: center;
  align-items: center;

  @media (prefers-color-scheme: dark) {
    background: rgba(0, 0, 0, 0.2);
    outline-color: white;
  }
`;

const FakeTypeform = props => {
  const { questionTitle, links, ...rest } = props;
  return (
    <TFWrapper {...rest}>
      <Text size={SIZES.md}>1. {questionTitle}</Text>
      <TFOptionsWrapper>
        {links.map((link, index) => {
          return (
            <TFOptionLink href={link.href} key={link.text}>
              <TFAnswerLetter>{indexToLetter(index)}</TFAnswerLetter>
              <OptionText>{link.text}</OptionText>
            </TFOptionLink>
          );
        })}
      </TFOptionsWrapper>
    </TFWrapper>
  );
};

const AnimatedWrapperOuter = styled.div`
  position: relative;
  width: 24rem;
  height: 16rem;
  margin-top: ${spacingLg};

  @media (min-width: ${breakpointMd}) {
    margin-top: 0;
  }
`;

const AnimatedWrapperInner = styled.div`
  position: absolute;
  left: 4rem;
  transition: all 0.8s ease;
  transition-delay: 0.4s;

  @media (min-width: ${breakpointSm}) {
    left: 0;
  }
`;

const HIDE_CLASS_NAME = `home-page-work-seciton__typeform--hide`;

const WorkSection = props => {
  const { hasBeenMostlyInView, hasBeenFullyInView, ...rest } = props;

  cleanRestScrollProps(rest);

  return (
    <Wrapper {...rest}>
      <style>
        {`
          .${JS_CLASSNAME} .${HIDE_CLASS_NAME} {
            left: 20rem;
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
      </Content>
      {/* <Graphic hasBeenMostlyInView={} /> */}
      <AnimatedWrapperOuter>
        <AnimatedWrapperInner className={hasBeenMostlyInView || hasBeenFullyInView ? '' : HIDE_CLASS_NAME}>
          <FakeTypeform
            questionTitle="Where to?"
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
