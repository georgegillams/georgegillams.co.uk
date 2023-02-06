import styled from 'styled-components';
import Skeleton from '@george-gillams/components/skeleton';
import { paragraphMarginTop, paragraphMarginTopFirst } from '@george-gillams/components/constants/font';
import { spacingBase, spacingSm } from '@george-gillams/components/constants/layout';

export const BodySkeleton = styled(Skeleton)`
  width: 100%;
  height: 50rem;
  margin-top: ${paragraphMarginTop};
`;

export const DateContainer = styled.div`
  margin-top: ${paragraphMarginTopFirst};
  margin-bottom: ${spacingBase};
`;

export const TagList = styled.div`
  margin-bottom: ${spacingBase};

  > * {
    margin: 0 ${spacingSm} ${spacingSm} 0;
  }
`;
