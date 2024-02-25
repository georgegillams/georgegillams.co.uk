import styled from 'styled-components';
import { breakpointMd, spacingLg } from '@george-gillams/components/constants/layout';
import { fontSizeMd } from '@george-gillams/components/constants/font';
import Paragraph from '@george-gillams/components/paragraph';
import HomepageCard from './HomepageCard';
import PhotoGallery from './PhotoGallery';
import MedalGallery from './MedalGallery';

export const Wrapper = styled.div``;

export const StyledParagraph = styled(Paragraph)`
  font-size: ${fontSizeMd};
`;

export const CardWrapper = styled.div`
  margin-top: ${spacingLg};
  display: grid;
  grid-template-columns: 1fr;
  /* grid-template-rows: 1fr 1fr 3fr 2fr; */
  grid-template-rows: 1fr 3fr 2fr;
  grid-gap: ${spacingLg};

  @media (min-width: ${breakpointMd}) {
    grid-template-columns: 3fr 5fr;
    grid-template-rows: 1.25fr 1.25fr 1fr;
    margin-top: calc(2 * ${spacingLg});
  }
`;

export const StyledBlogCard = styled(HomepageCard)`
  @media (min-width: ${breakpointMd}) {
    grid-row: 1;
    grid-column: 1;
  }
`;

export const StyledReadingCard = styled(HomepageCard)`
  @media (min-width: ${breakpointMd}) {
    grid-row: 2;
    grid-column: 1;
  }
`;

export const StyledPhotographyCard = styled(HomepageCard)`
  @media (min-width: ${breakpointMd}) {
    grid-row-start: 1;
    grid-row-end: 3;
    grid-column: 2;
  }
`;

export const StyledMedalCard = styled(HomepageCard)`
  @media (min-width: ${breakpointMd}) {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row: 3;
  }
`;

export const StyledPhotoGallery = styled(PhotoGallery)`
  width: 100%;
  height: 100%;
`;

export const StyledBlogGallery = styled.div`
  width: 100%;
  height: 100%;
  min-height: 7.5rem;
  background: green;
`;

export const StyledMedals = styled(MedalGallery)`
  width: 100%;
  height: 100%;
`;
