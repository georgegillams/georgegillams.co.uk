const portraitSize = label => ({
  label: label,
  width: 400,
  height: 300,
  source: 'https://via.placeholder.com/400x300',
});
const landscapeSize = label => ({
  label: label,
  width: 300,
  height: 400,
  source: 'https://via.placeholder.com/300x400',
});
const portraitSizes = [portraitSize('Original'), portraitSize('Large'), portraitSize('Large square')];
const landscapeSizes = [landscapeSize('Original'), landscapeSize('Large'), landscapeSize('Large square')];

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
      getInfo: () => ({
        body: {
          photo: {
            description: { _content: 'alt text' },
            dates: {
              taken: '2019-01-01 00:00:00',
            },
          },
        },
      }),
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
