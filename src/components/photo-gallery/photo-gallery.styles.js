import styled from 'styled-components';
import Image from '@george-gillams/components/image';

export const SimplePhotoGallery = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const SimplePhotoWrapper = styled.div`
  width: 48%;
  margin: 0 1% 1% 0;
`;

export const SimplePhoto = styled(Image)`
  width: 100%;
`;
