const portraitSize = label => ({
  label: label,
  width: 4000,
  height: 3000,
  source: 'https://via.placeholder.com/4000x3000',
});
const landscapeSize = label => ({
  label: label,
  width: 3000,
  height: 4000,
  source: 'https://via.placeholder.com/3000x4000',
});
const portraitSizes = [portraitSize('Original'), portraitSize('Large')];
const landscapeSizes = [landscapeSize('Original'), landscapeSize('Large')];

export default class MockFlickr {
  constructor() {
    this.photos = {
      getSizes: () => ({
        body: {
          sizes: {
            size: Math.random() < 0.5 ? portraitSizes : landscapeSizes,
          },
        },
      }),
      getInfo: () => ({ body: { photo: { description: { _content: 'alt text' } } } }),
    };
    this.photosets = {
      getPhotos: () => ({
        body: {
          photoset: {
            photo: [
              { id: 'photo-00' },
              { id: 'photo-01' },
              { id: 'photo-02' },
              { id: 'photo-03' },
              { id: 'photo-04' },
              { id: 'photo-05' },
              { id: 'photo-06' },
              { id: 'photo-07' },
              { id: 'photo-08' },
              { id: 'photo-09' },
              { id: 'photo-10' },
              { id: 'photo-11' },
              { id: 'photo-12' },
              { id: 'photo-13' },
              { id: 'photo-14' },
              { id: 'photo-15' },
              { id: 'photo-16' },
              { id: 'photo-17' },
              { id: 'photo-18' },
              { id: 'photo-19' },
            ],
          },
        },
      }),
    };
  }
}
