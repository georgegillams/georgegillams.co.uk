import styled from 'styled-components';
import Image from '@george-gillams/components/image';
import { breakpointMd, spacingLg } from '@george-gillams/components/constants/layout';

export const StyledImage = styled(Image)`
  width: 100%;
  margin-top: ${spacingLg};

  @media (min-width: ${breakpointMd}) {
    width: 80%;
  }
`;
