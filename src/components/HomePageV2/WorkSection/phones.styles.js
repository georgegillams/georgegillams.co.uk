import styled from 'styled-components';
import { breakpointMd } from '@george-gillams/components/constants/layout';
import SlidingPhone from './SlidingPhone';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 11rem;
  padding-top: 0;
  justify-content: space-around;
  align-items: center;

  @media (min-width: ${breakpointMd}) {
    height: 15rem;
    padding-top: 2rem;
  }
`;

export const StyledSlidingPhone = styled(SlidingPhone)`
  transform: rotate(-30deg);
  top: 10%;
`;
