import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import PageTitle from 'components/common/PageTitle';

import { CreativeCommons } from 'components/CreativeCommons';
import TextLink from 'components/common/TextLink';
import PageContainer from 'components/common/PageContainer';
import PhotographySkeleton from './PhotographySkeleton';
import LoadingCover from '@george-gillams/components/loading-cover';
import { ImageWrapper, LinkContainer, StyledImage } from './photography.styles';
import PhotoGallery from 'components/photo-gallery';
import { ANIMATIONS, ScrollAnimationWrapper, withScrollAnimation } from '@george-gillams/components/effects';
import Button from 'components/common/Button/Button';
import IopMember from './images/iop-member.jpg';
import GuildQualified from './images/guild-qualified.jpg';

const CreativeCommonsWithScroll = withScrollAnimation(CreativeCommons, { animation: ANIMATIONS.fade });

const Photography = props => {
  const { ssrPhotos, loadPhotos, photographyState } = props;

  useEffect(() => {
    loadPhotos();
  }, []);

  const photosToRender = JSON.parse(JSON.stringify(photographyState.photos || ssrPhotos));

  return (
    <>
      <PageContainer centred bottomPadding>
        <PageTitle anchor={false} name="Photography" />
        <ScrollAnimationWrapper>
          <LinkContainer>
            <Button hrefExternal href="https://www.flickr.com/photos/georgegillams">
              View all my photos on Flickr
            </Button>
            <TextLink hrefExternal href="https://instagram.com/tiggy.and.bamse">
              See Tigger and Bamse&#39;s Instagram 😻 🐶
            </TextLink>
            <TextLink hrefExternal href="https://unsplash.com/@georgegillams">
              View my profile on Unsplash
            </TextLink>
            <TextLink hrefExternal href="https://gurushots.com/georgegillams/achievements">
              Find me on GuruShots
            </TextLink>
            <TextLink href="/contact">Contact me about photography work</TextLink>
          </LinkContainer>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
          <ImageWrapper>
            <StyledImage
              imgProps={{
                alt: 'I have IOP membership having completed their Professional Diploma in Photography.',
              }}
              aspectX={1589}
              aspectY={850}
              lightSrc={IopMember.src}
              darkSrc={IopMember.src}
            />
            <StyledImage
              imgProps={{
                alt: 'I am a qualified member of the Guild of Photography.',
              }}
              aspectX={1417}
              aspectY={650}
              lightSrc={GuildQualified.src}
              darkSrc={GuildQualified.src}
            />
          </ImageWrapper>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper style={{ width: '100%' }}>
          <LoadingCover
            loadingSkeleton={PhotographySkeleton}
            loading={!photosToRender || !photosToRender.length}
            error={!!photographyState.photosLoadError}>
            <>
              <PhotoGallery photos={photosToRender} />
            </>
          </LoadingCover>
        </ScrollAnimationWrapper>
      </PageContainer>
      <CreativeCommonsWithScroll />
    </>
  );
};

Photography.propTypes = {
  photographyState: PropTypes.object,
  ssrPhotos: PropTypes.arrayOf(PropTypes.object),
  loadPhotos: PropTypes.func.isRequired,
};

Photography.defaultProps = { photographyState: {}, ssrPhotos: [] };

export default Photography;
