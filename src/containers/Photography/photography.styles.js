import { spacingBase, spacingLg } from '@george-gillams/components/constants/layout';
import styled from 'styled-components';

export const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${spacingLg} 0;

  > *:not(:last-child) {
    margin-bottom: ${spacingBase};
  }
`;
