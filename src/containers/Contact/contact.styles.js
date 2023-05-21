import styled, { css } from 'styled-components';

import InfoCell from '@george-gillams/components/info-cell';
import { spacingBase } from '@george-gillams/components/constants/layout';
import withScroll from '@george-gillams/components/scroll-container/with-scroll';
import { ANIMATIONS, withScrollAnimation } from '@george-gillams/components/effects';

const InfoCellWithScroll = withScrollAnimation(withScroll(InfoCell), { animation: ANIMATIONS.fade });

export const ImageIconContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

export const IconImage = styled.img`
  width: 6rem;
  height: 6rem;

  ${({ invertInDarkMode }) =>
    invertInDarkMode &&
    css`
      @media (prefers-color-scheme: dark) {
        filter: invert(100%);
      }
    `}
`;

export const Spacer = styled.div`
  height: ${spacingBase};
`;

export const StyledInfoCellWithScroll = styled(InfoCellWithScroll)`
  width: 100%;
`;

export const InfoCellContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
`;
