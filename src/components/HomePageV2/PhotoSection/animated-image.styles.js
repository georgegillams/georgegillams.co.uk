import styled from 'styled-components';

import Image from '@george-gillams/components/image';

export const Wrapper = styled.div`
  position: relative;
  height: 0;
  padding-bottom: 75%;
`;

export const StyledImage = styled(Image)`
  position: absolute;
  width: 100%;
  transition: all 0.8s ease-in-out;
  top: 0;
  opacity: 1;
`;
