import { put, takeLatest } from 'redux-saga/effects';

import { loadBlog, updateBlog } from '../actions';

import saga, { doLoadBlog, doUpdateBlog } from '../saga';

describe('BlogRenderer saga', () => {
  let mainSaga;

  beforeEach(() => {
    mainSaga = saga();
  });

  it('Should load blog on loadBlog TRIGGER', () => {
    const takeLatestDescriptor = mainSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(loadBlog.TRIGGER, doLoadBlog));
  });

  it('Should load blog on updateBlog TRIGGER', () => {
    mainSaga.next();
    const takeLatestDescriptor = mainSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(updateBlog.TRIGGER, doUpdateBlog));
  });

  describe('loadBlog actions', () => {
    let loadBlogGenerator;

    const response = {
      id: 'some-blog',
      title: 'Some fancy blog',
      status: 200,
    };

    beforeEach(() => {
      loadBlogGenerator = doLoadBlog();

      const selectDescriptor = loadBlogGenerator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
    });

    it('Should call loadBlog.success on successful API call', () => {
      loadBlogGenerator.next({ blogId: 'some-blog' });
      loadBlogGenerator.next();
      const putSuccess = loadBlogGenerator.next(response).value;
      loadBlogGenerator.next();

      expect(putSuccess).toEqual(put(loadBlog.success(response)));
    });

    it('Should call loadBlog.failure if API returns error', () => {
      const response = {
        error: 'error_type',
        errorMessage: 'Error message',
        status: 500,
      };
      loadBlogGenerator.next({ blogId: 'some-blog' });
      loadBlogGenerator.next();
      const putSuccess = loadBlogGenerator.next(response).value;
      loadBlogGenerator.next();

      expect(putSuccess).toEqual(put(loadBlog.failure(response)));
    });

    it('Should call loadBlog.failure if an exception occurs', () => {
      loadBlogGenerator.next({ blogId: 'some-blog' });
      const response = new Error('Some error');
      const putFailure = loadBlogGenerator.throw(response).value;

      expect(putFailure).toEqual(put(loadBlog.failure(response)));
    });
  });

  describe('updateBlog actions', () => {
    let updateBlogGenerator;

    const response = {
      status: 200,
    };

    beforeEach(() => {
      updateBlogGenerator = doUpdateBlog();

      const selectDescriptor = updateBlogGenerator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
    });

    it('Should call updateBlog.success on successful API call', () => {
      updateBlogGenerator.next({ blogToUpdate: { id: 'some-blog' } });
      updateBlogGenerator.next();
      const putSuccess = updateBlogGenerator.next(response).value;
      updateBlogGenerator.next();

      expect(putSuccess).toEqual(put(updateBlog.success(response)));
    });

    it('Should call updateBlog.failure if API returns error', () => {
      const response = {
        error: 'error_type',
        errorMessage: 'Error message',
        status: 500,
      };
      updateBlogGenerator.next({ blogId: 'some-blog' });
      updateBlogGenerator.next();
      const putSuccess = updateBlogGenerator.next(response).value;
      updateBlogGenerator.next();

      expect(putSuccess).toEqual(put(updateBlog.failure(response)));
    });

    it('Should call updateBlog.failure if an exception occurs', () => {
      updateBlogGenerator.next({ blogId: 'some-blog' });
      const response = new Error('Some error');
      const putFailure = updateBlogGenerator.throw(response).value;

      expect(putFailure).toEqual(put(updateBlog.failure(response)));
    });
  });
});
