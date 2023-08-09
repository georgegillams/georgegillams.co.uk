import { breakpointMd, spacingBase, spacingLg } from '@george-gillams/components/constants/layout';
import styled from 'styled-components';
import Image from '@george-gillams/components/image';

export const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${spacingLg} 0;

  > *:not(:last-child) {
    margin-bottom: ${spacingBase};
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${spacingLg};
  margin-bottom: ${spacingLg};

  @media (min-width: ${breakpointMd}) {
    flex-direction: row;
    align-items: center;
  }
`;

export const StyledImage = styled(Image)`
  width: 12rem;

  :nth-child(2) {
    margin-top: ${spacingLg};
  }

  @media (min-width: ${breakpointMd}) {
    width: 14rem;
    margin: 0 ${spacingLg};

    :nth-child(2) {
      margin-top: 0;
      width: 16.3rem;
    }
  }
`;
