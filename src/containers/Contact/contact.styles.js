import styled, { css } from 'styled-components';

import InfoCell from '@george-gillams/components/info-cell';
import { spacingBase } from '@george-gillams/components/constants/layout';
import withScroll from '@george-gillams/components/scroll-container/with-scroll';

const InfoCellWithScroll = withScroll(InfoCell);

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

export const StyledInfoCellWithScroll = styled(InfoCellWithScroll)`
  width: 100%;

  &:first-of-type {
    margin-top: ${spacingBase};
  }
`;
