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

export const DualCardWrapper = styled.div`
  margin-top: ${spacingLg};
  display: flex;
  flex-direction: column;

  @media (min-width: ${breakpointMd}) {
    flex-direction: row;
    align-items: stretch;
    margin-top: calc(2 * ${spacingLg});
  }
`;

export const StyledBlogCard = styled(HomepageCard)`
  margin-bottom: ${spacingLg};
  width: 100%;
  max-width: 24rem;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: ${breakpointMd}) {
    max-width: 20rem;
    margin-right: ${spacingLg};
    margin-left: unset;
  }
`;

export const StyledPhotographyCard = styled(HomepageCard)`
  flex-grow: 1;
  margin-bottom: ${spacingLg};
  max-width: 24rem;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: ${breakpointMd}) {
    max-width: unset;
    margin-left: unset;
    margin-right: unset;
  }
`;

export const StyledMedalCard = styled(HomepageCard)`
  width: 100%;
  max-width: 24rem;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: ${breakpointMd}) {
    max-width: unset;
    margin-left: unset;
    margin-right: unset;
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
