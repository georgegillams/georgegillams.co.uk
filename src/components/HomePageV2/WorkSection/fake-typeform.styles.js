import styled from 'styled-components';

import Text from '@george-gillams/components/text';
import {
  breakpointSm,
  spacingBase,
  spacingLg,
  spacingSm,
  spacingXs,
} from '@george-gillams/components/constants/layout';
import { notBlack, primaryColor, primaryColorDark } from '@george-gillams/components/constants/colors';

import SmoothCornersContainer from '@george-gillams/components/smooth-corners-container';

export const TF_WIDTH = '24rem';
export const TF_HEIGHT = '16rem';

export const TFWrapper = styled(SmoothCornersContainer).attrs({
  cornerRadiuses: {
    topLeft: 40,
    topRight: 40,
    bottomRight: 40,
    bottomLeft: 40,
  },
  idSuffixGenerator: () => 'homepage-typeform',
})`
  width: ${TF_WIDTH};
  text-align: left;
  height: ${TF_HEIGHT};
  background: ${primaryColor};
  padding: ${spacingLg};
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
  box-shadow: 0px 0px 0px 1px ${notBlack} inset;
  color: ${notBlack};
  text-decoration: none;
  display: flex;
  transition: background 0.2s ease;
  min-width: calc(4 * ${spacingLg});
  align-items: center;
  outline: none;

  @media (prefers-color-scheme: dark) {
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0px 0px 0px 1px white inset;
    color: white;
  }

  &:hover,
  &:focus,
  &:active {
    background: rgba(0, 0, 0, 0.2);
    box-shadow: 0px 0px 0px 1px ${notBlack} inset;

    @media (prefers-color-scheme: dark) {
      background: rgba(255, 255, 255, 0.4);
      box-shadow: 0px 0px 0px 2px white inset;
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

export const OptionText = styled(Text)`
  padding-top: 0.1rem;
`;

export const TFAnswerLetter = styled.div`
  padding-top: 0.1rem;
  width: 1.2rem;
  height: 1.2rem;
  background: rgba(255, 255, 255, 0.14);
  border-radius: 0.2rem;
  box-shadow: 0px 0px 0px 1px ${notBlack} inset;
  margin-right: ${spacingSm};
  display: flex;
  justify-content: center;
  align-items: center;

  @media (prefers-color-scheme: dark) {
    background: rgba(0, 0, 0, 0.2);
    box-shadow: 0px 0px 0px 1px white inset;
  }
`;
