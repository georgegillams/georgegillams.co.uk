import paragraph from '@george-gillams/components/paragraph';
import styled from 'styled-components';
import { fontSizeMd } from '@george-gillams/components/constants/font';
import { breakpointMd, breakpointSm, spacingLg } from '@george-gillams/components/constants/layout';
import { TF_HEIGHT, TF_WIDTH } from './fake-typeform.styles';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  text-align: center;
  justify-content: space-between;
  margin-top: ${spacingLg};

  @media (min-width: ${breakpointMd}) {
    flex-direction: row;
    text-align: left;
    margin-top: calc(2 * ${spacingLg});
  }
`;

export const Content = styled.div`
  width: 100%;
  flex-grow: 1;
  max-width: 25rem;
  margin-right: 0;

  @media (min-width: ${breakpointMd}) {
    max-width: 50%;
    margin-right: 0.5rem;
  }
`;

export const StyledParagraph = styled(paragraph)`
  font-size: ${fontSizeMd};
`;

export const AnimatedWrapperOuter = styled.div`
  position: relative;
  width: ${TF_WIDTH};
  height: ${TF_HEIGHT};
  margin-top: ${spacingLg};

  @media (min-width: ${breakpointMd}) {
    margin-top: 0;
  }
`;

export const AnimatedWrapperInner = styled.div`
  position: absolute;
  left: 4rem;
  transition: all 0.8s ease;
  transition-delay: 0.4s;

  @media (min-width: ${breakpointSm}) {
    left: 0;
  }
`;
