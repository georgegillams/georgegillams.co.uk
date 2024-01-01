import styled, { css } from 'styled-components';
import Text, { SIZES, TAG_NAME } from '@george-gillams/components/text';
import Image from '@george-gillams/components/image/image';
import { breakpointMd, breakpointSm, spacingBase, spacingSm } from '@george-gillams/components/constants/layout';

const HEIGHT_MOBILE = '4rem';
const HEIGHT_DESKTOP = '5rem';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: ${HEIGHT_MOBILE} 1fr;
  min-height: ${HEIGHT_MOBILE};
  gap: ${spacingSm} ${spacingBase};
  /* align-items: center; */

  @media (min-width: ${breakpointSm}) {
    grid-template-columns: ${HEIGHT_MOBILE} 1fr 10rem;
    grid-template-rows: 3;
  }

  @media (min-width: ${breakpointMd}) {
    gap: calc(2 * ${spacingSm}) ${spacingBase};
    grid-template-columns: ${HEIGHT_DESKTOP} 1fr 10rem;
  }

  ${({ notRead }) =>
    notRead &&
    css`
      opacity: 0.6;
    `}
`;

export const CoverImage = styled(Image).attrs({
  aspectX: 1,
  aspectY: 1,
})`
  grid-row-start: 1;
  grid-row-end: 4;
  height: ${HEIGHT_MOBILE};
  width: ${HEIGHT_MOBILE};

  @media (min-width: ${breakpointMd}) {
    height: ${HEIGHT_DESKTOP};
    width: ${HEIGHT_DESKTOP};
  }
`;

export const Title = styled(Text).attrs({
  size: SIZES.md,
  tagName: TAG_NAME.h2,
})`
  grid-row: 1;
  grid-column: 2;
`;

export const Author = styled(Text).attrs({
  size: SIZES.sm,
})`
  grid-row: 2;
  grid-column: 2;
`;

export const Status = styled(Text).attrs({
  size: SIZES.sm,
})`
  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `}

  grid-row: 3;
  grid-column: 2;
`;

export const Recommendation = styled(Text).attrs({
  size: SIZES.sm,
})`
  grid-column: 2;

  @media (min-width: ${breakpointSm}) {
    grid-row: 3;
    grid-column: 3;
  }
`;

export const LinkWrapper = styled.div.attrs()`
  grid-column: 2;
  display: flex;
  gap: 1rem;

  @media (min-width: ${breakpointSm}) {
    grid-row: 1;
    grid-column: 3;
  }
`;
