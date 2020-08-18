import { put, takeLatest } from 'redux-saga/effects';

import { loadBlogs, deleteBlog } from '../actions';

import saga, { doLoadBlogs, doDeleteBlog } from '../saga';

describe('BlogList saga', () => {
  let mainSaga;

  beforeEach(() => {
    mainSaga = saga();
  });

  it('Should load blogs on loadBlogs TRIGGER', () => {
    const takeLatestDescriptor = mainSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(loadBlogs.TRIGGER, doLoadBlogs));
  });

  it('Should load blogs on deleteBlog TRIGGER', () => {
    mainSaga.next();
    const takeLatestDescriptor = mainSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(deleteBlog.TRIGGER, doDeleteBlog));
  });

  describe('loadBlogs actions', () => {
    let loadBlogsGenerator;

    const response = {
      blogs: 'list of blogs',
      status: 200,
    };

    beforeEach(() => {
      loadBlogsGenerator = doLoadBlogs();

      const selectDescriptor = loadBlogsGenerator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
    });

    it('Should call loadBlogs.success on successful API call', () => {
      loadBlogsGenerator.next();
      const putSuccess = loadBlogsGenerator.next(response).value;
      loadBlogsGenerator.next();

      expect(putSuccess).toEqual(put(loadBlogs.success(response)));
    });

    it('Should call loadBlogs.failure if API returns error', () => {
      const response = {
        error: 'error_type',
        errorMessage: 'Error message',
        status: 500,
      };
      loadBlogsGenerator.next();
      const putSuccess = loadBlogsGenerator.next(response).value;
      loadBlogsGenerator.next();

      expect(putSuccess).toEqual(put(loadBlogs.failure(response)));
    });

    it('Should call loadBlogs.failure if an exception occurs', () => {
      const response = new Error('Some error');
      const putFailure = loadBlogsGenerator.throw(response).value;

      expect(putFailure).toEqual(put(loadBlogs.failure(response)));
    });
  });

  describe('deleteBlog actions', () => {
    let deleteBlogGenerator;

    const response = {
      status: 200,
    };

    beforeEach(() => {
      deleteBlogGenerator = doDeleteBlog();

      const selectDescriptor = deleteBlogGenerator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
    });

    it('Should call deleteBlog.success on successful API call', () => {
      deleteBlogGenerator.next({ blogToDelete: 'some-blog-id' });
      deleteBlogGenerator.next();
      const putSuccess = deleteBlogGenerator.next(response).value;
      deleteBlogGenerator.next();

      expect(putSuccess).toEqual(put(deleteBlog.success()));
    });

    it('Should call deleteBlog.failure if API returns error', () => {
      const response = {
        error: 'error_type',
        errorMessage: 'Error message',
        status: 500,
      };
      deleteBlogGenerator.next({ blogToDelete: 'some-blog-id' });
      deleteBlogGenerator.next();
      const putSuccess = deleteBlogGenerator.next(response).value;
      deleteBlogGenerator.next();

      expect(putSuccess).toEqual(put(deleteBlog.failure(response)));
    });

    it('Should call deleteBlog.failure if an exception occurs', () => {
      const response = new Error('Some error');
      deleteBlogGenerator.next({ blogToDelete: 'some-blog-id' });
      const putFailure = deleteBlogGenerator.throw(response).value;

      expect(putFailure).toEqual(put(deleteBlog.failure(response)));
    });
  });
});
