import Flickr from 'flickr-sdk';
import MockFlickr from './MockFlickr';

const flickr = process.env.FLICKR_API_KEY ? new Flickr(process.env.FLICKR_API_KEY) : new MockFlickr();

const cache = {};

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

const getPhotoSize = async photoId => {
  const res = await flickr.photos.getSizes({ photo_id: photoId });
  const sizes = res.body.sizes.size;
  const originalSize = sizes.find(size => size.label === 'Original');
  const largeSize = sizes.find(size => size.label === 'Large');
  const smallSize = sizes.find(size => size.label === 'Large Square');
  return {
    width: originalSize?.width || 0,
    height: originalSize?.height || 0,
    src: largeSize?.source || originalSize?.source || '',
    thumbnailSrc: smallSize?.source || originalSize?.source || '',
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

const updateCachedValue = async () => {
  cache.expiry = Date.now() + ONE_DAY_IN_MS;

  // https://www.flickr.com/services/api/flickr.photosets.getPhotos.html
  const res = await flickr.photosets.getPhotos({ photoset_id: '72177720301327018', user_id: '137198167@N03' });
  const photos = res.body.photoset.photo.reverse();
  const photosWithInformation = await Promise.all(photos.map(photo => attachPhotoInformation(photo)));
  const apiResult = {
    photos: photosWithInformation.map(photo => ({
      key: photo.id,
      ...photo.size,
      alt: photo.information.description,
    })),
  };

  cache.value = apiResult;
};

export default async function loadAll() {
  if (!cache.value) {
    // If no cached value, we have to wait for it to be fetched and then return it
    await updateCachedValue();
  } else if (cache.expiry < Date.now()) {
    // If the cached value is expired, we want to update it. But we don't need to wait for it to be updated before returning the currently cached version
    updateCachedValue();
  }

  return cache.value;
}
