import React from 'react';
import PropTypes from 'prop-types';
import ReactPhotoGallery from 'react-photo-gallery';
import Image from '@george-gillams/components/image';
import { spacingXs } from '@george-gillams/components/constants/layout';
import { JS_CLASSNAME, NO_JS_CLASSNAME } from '@george-gillams/components/js-feature-detector';
import { SimplePhoto, SimplePhotoGallery, SimplePhotoWrapper } from './photo-gallery.styles';

const ImageComp = props => {
  const { photo, ...rest } = props;
  return (
    <div
      style={{
        width: photo.width,
        height: photo.height,
        padding: spacingXs,
      }}
      {...rest}>
      <Image
        aspectX={photo.width}
        aspectY={photo.height}
        imgProps={{ alt: photo.alt }}
        lightSrc={photo.src}
        darkSrc={photo.src}
      />
    </div>
  );
};

ImageComp.propTypes = {
  photo: PropTypes.shape({
    src: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
};

const PhotoGallery = props => {
  const { photos } = props;

  return (
    <>
      <style>{`
      .${JS_CLASSNAME} .photo-gallery_simple {
  display: none !important;
}
      .${NO_JS_CLASSNAME} .photo-gallery_smart {
  display: none !important;
}
      `}</style>
      <SimplePhotoGallery className={'photo-gallery_simple'}>
        {photos.map(p => {
          return (
            <SimplePhotoWrapper key={p.key}>
              <SimplePhoto lightSrc={p.src} darkSrc={p.src} aspectX={p.width} aspectY={p.height} />
            </SimplePhotoWrapper>
          );
        })}
      </SimplePhotoGallery>
      <ReactPhotoGallery photos={photos} renderImage={ImageComp} className={'photo-gallery_smart'} />
    </>
  );
};

PhotoGallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object),
};

PhotoGallery.defaultProps = { photos: [] };

export default PhotoGallery;
