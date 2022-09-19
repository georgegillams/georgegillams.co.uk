import styled from 'styled-components';
import Image from '@george-gillams/components/image';

export const Wrapper = styled.div`
  position: relative;
  width: 20%;
  height: 0;
  padding-bottom: 38.5%;
`;

export const StyledImage = styled(Image)`
  position: absolute;
  top: 0;
  width: 100%;
  opacity: 1;
  transition: all 0.8s ease-in-out;
`;
