import { breakpointMd } from '@george-gillams/components/constants/layout';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 90%;

  @media (min-width: ${breakpointMd}) {
    max-width: 70%;
  }
`;
