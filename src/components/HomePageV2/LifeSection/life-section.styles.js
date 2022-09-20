import styled, { css } from 'styled-components';
import { breakpointMd, spacingLg } from '@george-gillams/components/constants/layout';
import { fontSizeMd } from '@george-gillams/components/constants/font';
import Image from '@george-gillams/components/image';
import Paragraph from '@george-gillams/components/paragraph';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  height: unset;
  margin-bottom: ${spacingLg};
  flex-direction: column;
  text-align: center;

  @media (min-width: ${breakpointMd}) {
    height: 21.6875rem;
    margin-bottom: unset;
    flex-direction: row;
    text-align: left;
  }
`;

export const StyledParagraph = styled(Paragraph)`
  font-size: ${fontSizeMd};
`;

export const Content = styled.div`
  width: 100%;
  flex-grow: 1;
  max-width: unset;
  margin: 0 0 1rem 0;

  @media (min-width: ${breakpointMd}) {
    max-width: 20rem;
    margin: 0 3rem;
  }
`;

const imageAboveTabletStyles = css`
  width: 100%;
  transition: margin 0.4s ease-in-out, transform 0.4s ease-in-out;
  display: none;

  @media (min-width: ${breakpointMd}) {
    display: unset;
  }
`;

export const ImageAboveTabletLeft = styled(Image)`
  ${imageAboveTabletStyles}

  width: 35%;
`;

export const ImageAboveTabletRight = styled(Image)`
  ${imageAboveTabletStyles}

  width: 55%;
`;

export const MobileImageWrapper = styled.div`
  display: flex;
  width: 90%;
  margin-left: 5%;
  justify-content: space-between;

  @media (min-width: ${breakpointMd}) {
    display: none;
  }
`;

export const MobileImageInnerWrapperLeft = styled.div`
  width: 48%;
  width: 30%;
  transition: margin 0.8s ease-in-out, opacity 0.8s ease-in-out;
`;

export const MobileImageInnerWrapperRight = styled.div`
  width: 48%;
  width: 68%;
  transition: margin 0.8s ease-in-out, opacity 0.8s ease-in-out;
  transition-delay: 0.4s;
`;
