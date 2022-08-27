import Flickr from 'flickr-sdk';
import MockFlickr from './MockFlickr';

const flickr = process.env.FLICKR_API_KEY ? new Flickr(process.env.FLICKR_API_KEY) : new MockFlickr();

const getPhotoSize = async photoId => {
  const res = await flickr.photos.getSizes({ photo_id: photoId });
  const sizes = res.body.sizes.size;
  const originalSize = sizes.find(size => size.label === 'Original');
  const largeSize = sizes.find(size => size.label === 'Large');
  return {
    width: originalSize?.width || 0,
    height: originalSize?.height || 0,
    src: largeSize?.source || originalSize?.source || '',
  };
};

const getPhotoInformation = async photoId => {
  const res = await flickr.photos.getInfo({ photo_id: photoId });
  const info = res.body;
  return { description: info.photo.description._content };
};

const attachPhotoInformation = async photo => {
  const photoSize = await getPhotoSize(photo.id);
  const photoInformation = await getPhotoInformation(photo.id);
  return { ...photo, size: photoSize, information: photoInformation };
};

export default async function loadAll() {
  // https://www.flickr.com/services/api/flickr.photosets.getPhotos.html
  const res = await flickr.photosets.getPhotos({ photoset_id: '72177720301327018', user_id: '137198167@N03' });
  const photos = res.body.photoset.photo;
  const photosWithInformation = await Promise.all(photos.map(photo => attachPhotoInformation(photo)));
  return {
    photos: photosWithInformation.map(photo => ({
      id: photo.id,
      ...photo.size,
      alt: photo.information.description,
    })),
  };
}
