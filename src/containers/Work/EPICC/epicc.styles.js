import styled from 'styled-components';
import Image from '@george-gillams/components/image';
import { spacingBase, spacingLg } from '@george-gillams/components/constants/layout';

export const Gallery = styled.div`
  display: flex;
  margin-top: ${spacingLg};
  flex-direction: column;
  align-items: center;
`;

export const Screenshot = styled(Image)`
  width: 100%;
  margin-top: ${spacingBase};
  margin-bottom: ${spacingLg};
`;
