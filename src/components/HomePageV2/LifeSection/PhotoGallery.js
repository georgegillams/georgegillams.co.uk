import React, { useEffect, useMemo, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { borderRadiusSm, spacingBase } from '@george-gillams/components/constants/layout';
import apiStructure from 'helpers/common/apiStructure';
import {
  alternatingBackgroundColor2,
  alternatingBackgroundColor2DarkMode,
} from '@george-gillams/components/constants/colors';

const REQUIRED_PHOTOS_COLUMNS = 8;
const REQUIRED_PHOTOS_ROWS = 10;
const REQUIRED_PHOTOS_ARRAY_LENGTH = REQUIRED_PHOTOS_COLUMNS * REQUIRED_PHOTOS_ROWS;

const OuterWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 15rem;
`;

const scrollAnimation = keyframes`
 from { 
  transform: rotate(-25deg) translate(6rem, -4rem);
 }
 to { 
  transform: rotate(-25deg) translate(6rem, calc(-4rem - 50%));
 }
`;

const InnerWrapper = styled.div`
  position: absolute;
  animation: ${scrollAnimation} 10s linear infinite;
`;

const StyledImage = styled.div`
  background-color: ${alternatingBackgroundColor2};
  width: 4rem;
  height: 4rem;
  border-radius: ${borderRadiusSm};
  margin: 0 ${spacingBase} ${spacingBase} 0;

  @media (prefers-color-scheme: dark) {
    background-color: ${alternatingBackgroundColor2DarkMode};
  }

  ${props =>
    props.src &&
    css`
      background-image: url(${props.src});
      background-position: center;
      background-size: cover;
    `}
`;

const Photo = props => {
  return <StyledImage {...props} />;
};

const PhotoRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const PhotoGallery = props => {
  const { ...rest } = props;

  const [loadedPhotos, setLoadedPhotos] = useState(null);

  useEffect(() => {
    fetch(apiStructure.loadShowcaseImages.fullPath)
      .then(data => data.json())
      .then(result => setLoadedPhotos(result.photos))
      .catch(() => {
        setLoadedPhotos(null);
      });
  }, []);

  const photoRows = useMemo(() => {
    let photosArray = [];
    if (!loadedPhotos || loadedPhotos.length < 1) {
      photosArray = Array(REQUIRED_PHOTOS_ARRAY_LENGTH)
        .fill(null)
        .map((_, i) => ({
          key: `photo${i}`,
        }));
    } else {
      photosArray = loadedPhotos.map(({ thumbnailSrc, ...rest }) => ({
        ...rest,
        // override src and thumbnailSrc so that we use thumbnails for the gallery
        src: thumbnailSrc,
        thumbnailSrc: undefined,
      }));
      while (photosArray.length < REQUIRED_PHOTOS_ARRAY_LENGTH / 2) {
        photosArray = [...photosArray, ...loadedPhotos];
      }
      photosArray = photosArray.slice(0, REQUIRED_PHOTOS_ARRAY_LENGTH / 2);
      photosArray = [...photosArray, ...photosArray];
    }

    const numberOfRows = Math.ceil(photosArray.length / REQUIRED_PHOTOS_COLUMNS);
    const rows = [];
    for (let i = 0; i < numberOfRows; i += 1) {
      rows.push({
        key: `row${i}`,
        photos: photosArray.slice(i * REQUIRED_PHOTOS_COLUMNS, (i + 1) * REQUIRED_PHOTOS_COLUMNS),
      });
    }

    return rows;
  }, [loadedPhotos]);

  return (
    <OuterWrapper
      aria-label="A scrolling gallery of image thumbnails. View full images with alt-text on the photography page."
      {...rest}>
      <InnerWrapper aria-hidden="true">
        {photoRows.map(row => (
          <PhotoRow key={row.key}>
            {row.photos.map(photo => (
              <Photo key={photo.key} {...photo} />
            ))}
          </PhotoRow>
        ))}
      </InnerWrapper>
    </OuterWrapper>
  );
};

PhotoGallery.propTypes = {};

PhotoGallery.defaultProps = {};

export default PhotoGallery;
