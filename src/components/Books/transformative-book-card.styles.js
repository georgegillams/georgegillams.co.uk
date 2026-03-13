import styled from 'styled-components';
import Text, { SIZES, TAG_NAME } from '@george-gillams/components/text';
import Image from '@george-gillams/components/image/image';
import {
  borderRadiusSm,
  breakpointMd,
  spacingBase,
  spacingSm,
  spacingLg,
} from '@george-gillams/components/constants/layout';

const HEIGHT_MOBILE = '6rem';
const HEIGHT_DESKTOP = '8rem';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: ${HEIGHT_MOBILE} 1fr;
  min-height: ${HEIGHT_MOBILE};
  gap: ${spacingSm} ${spacingBase};
  padding: ${spacingBase};
  border-radius: ${borderRadiusSm};
  background: var(--card-background, rgba(128, 128, 128, 0.05));
  border: 1px solid var(--card-border, rgba(128, 128, 128, 0.1));

  @media (min-width: ${breakpointMd}) {
    grid-template-columns: ${HEIGHT_DESKTOP} 1fr;
    min-height: ${HEIGHT_DESKTOP};
    gap: ${spacingSm} ${spacingLg};
  }
`;

export const CoverImage = styled(Image).attrs({
  aspectX: 1,
  aspectY: 1,
})`
  grid-row-start: 1;
  grid-row-end: 5;
  height: ${HEIGHT_MOBILE};
  width: ${HEIGHT_MOBILE};
  border-radius: ${borderRadiusSm};
  overflow: hidden;

  @media (min-width: ${breakpointMd}) {
    height: ${HEIGHT_DESKTOP};
    width: ${HEIGHT_DESKTOP};
  }
`;

export const Title = styled(Text).attrs({
  size: SIZES.lg,
  tagName: TAG_NAME.h3,
})`
  grid-row: 1;
  grid-column: 2;
  font-weight: 600;
`;

export const Author = styled(Text).attrs({
  size: SIZES.md,
})`
  grid-row: 2;
  grid-column: 2;
`;

export const Description = styled(Text).attrs({
  size: SIZES.sm,
})`
  grid-row: 3;
  grid-column: 2;
  font-style: italic;
  opacity: 0.85;
  margin-top: ${spacingSm};
`;

export const LinkWrapper = styled.div`
  grid-row: 4;
  grid-column: 2;
  display: flex;
  gap: 1rem;
  margin-top: ${spacingSm};
`;
