import styled from 'styled-components';
import Image from '@george-gillams/components/image';
import DegreeModule from '@george-gillams/components/degree-module';
import { spacingLg } from '@george-gillams/components/constants/layout';

export const StyledDegreeModule = styled(DegreeModule)`
  margin-bottom: 0.5rem;
`;

export const StyledImage = styled(Image)`
  width: 70%;
  max-width: 20rem;
  margin-top: ${spacingLg};
  margin-bottom: ${spacingLg};

  @media (prefers-color-scheme: dark) {
    filter: contrast(0) brightness(20);
  }
`;
