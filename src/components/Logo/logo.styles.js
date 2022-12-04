import { primaryColor, primaryColorDarkMode } from '@george-gillams/components/constants/colors';
import { breakpointMd, breakpointSm, spacingBase, spacingLg } from '@george-gillams/components/constants/layout';
import { focusStyle } from '@george-gillams/components/constants/styles';
import Link from 'next/link';
import styled, { css, keyframes } from 'styled-components';

export const OuterContainer = styled.div`
  display: flex;
  padding-bottom: ${spacingBase};
  flex-direction: column;
  transition: transform 0.2s;
  border-radius: 0.25rem;
  outline: none;
  padding-right: ${spacingLg};
  padding-left: ${spacingLg};
  align-items: center;

  @media (min-width: ${breakpointMd}) {
    padding-right: unset;
    padding-left: unset;
    align-items: unset;
  }

  ${({ alwaysCentred }) =>
    alwaysCentred &&
    css`
      align-items: center;
    `}

  ${({ padding }) =>
    !padding &&
    css`
      padding: 0;
    `}
`;

const bounceHoverEffect = keyframes`
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
`;

const linkStyles = css`
  border-radius: 0.25rem;

  ${focusStyle(true)}

  &:hover,
  &:active,
  &:focus {
    animation-duration: 0.4s;
    animation-name: ${bounceHoverEffect};
  }
`;

export const StyledLink = styled.a`
  ${linkStyles}
`;

export const StyledNextLink = styled(Link)`
  ${linkStyles}
`;

export const LargeText = styled.span`
  display: inline-block;
  padding-top: 0.1rem;
  border-radius: 0.25rem;
  color: ${props => props.theme?.logoColor || primaryColor};
  font-size: 2.6rem;
  line-height: 1.2;
  font-weight: bold;

  @media (min-width: ${breakpointSm}) {
    font-size: 3rem;
  }

  @media (prefers-color-scheme: dark) {
    color: ${props => props.theme?.logoColorDarkMode || primaryColorDarkMode};
  }

  ${({ pride }) =>
    pride &&
    css`
      @supports (background-clip: text) {
        background-image: linear-gradient(
          to bottom right,
          rgb(136, 65, 136),
          rgb(136, 65, 136),
          rgb(136, 65, 136),
          rgb(126, 60, 173),
          rgb(56, 56, 192),
          rgb(47, 177, 47),
          rgb(216, 216, 0),
          rgb(209, 136, 1),
          rgb(209, 28, 28),
          rgb(209, 28, 28),
          rgb(209, 28, 28)
        );
        color: transparent;
        background-clip: text;

        @media (prefers-color-scheme: dark) {
          background-image: linear-gradient(
            to bottom right,
            rgb(136, 57, 136),
            rgb(136, 57, 136),
            rgb(136, 57, 136),
            rgb(94, 25, 143),
            rgb(57, 57, 161),
            rgb(60, 134, 60),
            rgb(165, 165, 69),
            rgb(175, 140, 75),
            rgb(155, 72, 72),
            rgb(155, 72, 72),
            rgb(155, 72, 72)
          );
        }
      }
    `}

  ${({ padding }) =>
    padding &&
    css`
      margin: 0;
      line-height: normal;
    `}
`;
