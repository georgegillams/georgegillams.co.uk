import { put, takeLatest } from 'redux-saga/effects';

import { loadPhotos } from '../actions';

import saga, { doLoadPhotos } from '../saga';

describe('Support saga', () => {
  let mainSaga;

  beforeEach(() => {
    mainSaga = saga();
  });

  it('Should load photos on loadPhotos TRIGGER', () => {
    const takeLatestDescriptor = mainSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(loadPhotos.TRIGGER, doLoadPhotos));
  });

  describe('loadPhotos actions', () => {
    let generator;

    const response = {
      supportMessages: {
        id: 'some-photo',
        name: 'photo 1',
      },
      status: 200,
    };

    beforeEach(() => {
      generator = doLoadPhotos();

      const selectDescriptor = generator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
    });

    it('Should call loadPhotos.success on successful API call', () => {
      generator.next();
      const putSuccess = generator.next(response).value;
      generator.next();

      expect(putSuccess).toEqual(put(loadPhotos.success(response)));
    });

    it('Should call loadPhotos.failure if API returns error', () => {
      const response = {
        error: 'error_type',
        errorMessage: 'Error message',
        status: 500,
      };
      generator.next();
      const putSuccess = generator.next(response).value;
      generator.next();

      expect(putSuccess).toEqual(put(loadPhotos.failure(response)));
    });

    it('Should call loadPhotos.failure if an exception occurs', () => {
      const response = new Error('Some error');
      const putFailure = generator.throw(response).value;

      expect(putFailure).toEqual(put(loadPhotos.failure(response)));
    });
  });
});
