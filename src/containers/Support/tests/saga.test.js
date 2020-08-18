import { put, takeLatest } from 'redux-saga/effects';

import { loadLinks, createLink, deleteLink } from '../actions';

import saga, { doLoadLinks, doCreateLink, doDeleteLink } from '../saga';

describe('Support saga', () => {
  let mainSaga;

  beforeEach(() => {
    mainSaga = saga();
  });

  it('Should load links on loadLinks TRIGGER', () => {
    const takeLatestDescriptor = mainSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(loadLinks.TRIGGER, doLoadLinks));
  });

  it('Should create link on createLink TRIGGER', () => {
    mainSaga.next();
    const takeLatestDescriptor = mainSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(createLink.TRIGGER, doCreateLink));
  });

  it('Should delete link on deleteLink TRIGGER', () => {
    mainSaga.next();
    mainSaga.next();
    const takeLatestDescriptor = mainSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(deleteLink.TRIGGER, doDeleteLink));
  });

  describe('loadLinks actions', () => {
    let generator;

    const response = {
      supportMessages: {
        id: 'some-link',
        name: 'link 1',
      },
      status: 200,
    };

    beforeEach(() => {
      generator = doLoadLinks();

      const selectDescriptor = generator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
    });

    it('Should call loadLinks.success on successful API call', () => {
      generator.next();
      const putSuccess = generator.next(response).value;
      generator.next();

      expect(putSuccess).toEqual(put(loadLinks.success(response)));
    });

    it('Should call loadLinks.failure if API returns error', () => {
      const response = {
        error: 'error_type',
        errorMessage: 'Error message',
        status: 500,
      };
      generator.next();
      const putSuccess = generator.next(response).value;
      generator.next();

      expect(putSuccess).toEqual(put(loadLinks.failure(response)));
    });

    it('Should call loadLinks.failure if an exception occurs', () => {
      const response = new Error('Some error');
      const putFailure = generator.throw(response).value;

      expect(putFailure).toEqual(put(loadLinks.failure(response)));
    });
  });

  describe('createLink actions', () => {
    let generator;

    const response = {
      status: 200,
    };

    beforeEach(() => {
      generator = doCreateLink();

      const selectDescriptor = generator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
    });

    it('Should call createLink.success on successful API call', () => {
      generator.next({ linkToCreate: 'some-link' });
      generator.next();
      const putSuccess = generator.next(response).value;
      generator.next();

      expect(putSuccess).toEqual(put(createLink.success(response)));
    });

    it('Should call createLink.failure if API returns error', () => {
      const response = {
        error: 'error_type',
        errorMessage: 'Error message',
        status: 500,
      };
      generator.next({ linkToCreate: 'some-link' });
      generator.next();
      const putSuccess = generator.next(response).value;
      generator.next();

      expect(putSuccess).toEqual(put(createLink.failure(response)));
    });

    it('Should call createLink.failure if an exception occurs', () => {
      generator.next({ linkToCreate: 'some-link' });
      const response = new Error('Some error');
      const putFailure = generator.throw(response).value;

      expect(putFailure).toEqual(put(createLink.failure(response)));
    });
  });

  describe('deleteLink actions', () => {
    let generator;

    const response = {
      status: 200,
    };

    beforeEach(() => {
      generator = doDeleteLink();

      const selectDescriptor = generator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
    });

    it('Should call deleteLink.success on successful API call', () => {
      generator.next({ linkToDelete: 'some-link' });
      generator.next();
      const putSuccess = generator.next(response).value;
      generator.next();

      expect(putSuccess).toEqual(put(deleteLink.success(response)));
    });

    it('Should call deleteLink.failure if API returns error', () => {
      const response = {
        error: 'error_type',
        errorMessage: 'Error message',
        status: 500,
      };
      generator.next({ linkToDelete: 'some-link' });
      generator.next();
      const putSuccess = generator.next(response).value;
      generator.next();

      expect(putSuccess).toEqual(put(deleteLink.failure(response)));
    });

    it('Should call deleteLink.failure if an exception occurs', () => {
      generator.next({ linkToDelete: 'some-link' });
      const response = new Error('Some error');
      const putFailure = generator.throw(response).value;

      expect(putFailure).toEqual(put(deleteLink.failure(response)));
    });
  });
});
