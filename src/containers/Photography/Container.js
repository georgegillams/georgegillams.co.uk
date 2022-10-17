import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import PageTitle from 'components/common/PageTitle';

import { CreativeCommons } from 'components/CreativeCommons';
import TextLink from 'components/common/TextLink';
import PageContainer from 'components/common/PageContainer';
import PhotographySkeleton from './PhotographySkeleton';
import LoadingCover from '@george-gillams/components/loading-cover';
import { LinkContainer } from './photography.styles';
import PhotoGallery from 'components/photo-gallery';
import { ANIMATIONS, ScrollAnimationWrapper, withScrollAnimation } from '@george-gillams/components/effects';

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
            <TextLink hrefExternal href="https://www.flickr.com/people/georgegillams/">
              Find me on Flickr
            </TextLink>
            <TextLink hrefExternal href="https://unsplash.com/@georgegillams">
              Find me on Unsplash
            </TextLink>
            <TextLink hrefExternal href="https://gurushots.com/georgegillams/achievements">
              Find me on GuruShots
            </TextLink>
            <TextLink href="/contact">Contact me about photography work</TextLink>
          </LinkContainer>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
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
