import styled from 'styled-components';
import MedalShelf from '@george-gillams/components/medal-shelf';
import { spacingBase, spacingXs } from '@george-gillams/components/constants/layout';

export const StyledMedalShelf = styled(MedalShelf)`
  margin-top: ${spacingXs};
`;

export const AdminMedalBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacingXs};
  max-width: 100%;
`;

export const AdminMedalActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacingBase};
  justify-content: center;
  width: 100%;
`;
