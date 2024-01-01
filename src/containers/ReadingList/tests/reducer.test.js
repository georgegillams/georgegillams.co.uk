import blogListReducer from '../reducer';
import { loadBlogs, deleteBlog } from '../actions';
import { initialState } from '../reducer';

describe('blogListReducer', () => {
  let state;

  beforeEach(() => {
    state = {
      ...initialState,
    };
  });

  it('should return the initial state', () => {
    expect(blogListReducer(undefined, {})).toEqual(state);
  });

  describe('loadBlogs actions', () => {
    it('should handle the action loadBlogs.REQUEST correctly', () => {
      const expectResult = {
        ...state,
        loadingBlogs: true,
      };

      expect(blogListReducer(state, loadBlogs.request())).toEqual(expectResult);
    });

    it('should return the action loadBlogs.SUCCESS correctly', () => {
      const expectResult = {
        ...state,
        blogs: 'Some blogs',
      };

      expect(blogListReducer(state, loadBlogs.success({ blogs: 'Some blogs' }))).toEqual(expectResult);
    });

    it('should return the action loadBlogs.FAILURE correctly', () => {
      const expectResult = {
        ...state,
        loadBlogsError: 'some error',
      };

      expect(blogListReducer(state, loadBlogs.failure('some error'))).toEqual(expectResult);
    });
  });

  describe('deleteBlog actions', () => {
    it('should handle the action deleteBlog.REQUEST correctly', () => {
      const expectResult = {
        ...state,
        deletingBlog: true,
      };

      expect(blogListReducer(state, deleteBlog.request())).toEqual(expectResult);
    });

    it('should return the action deleteBlog.SUCCESS correctly', () => {
      const expectResult = {
        ...state,
      };

      expect(blogListReducer(state, deleteBlog.success())).toEqual(expectResult);
    });

    it('should return the action deleteBlog.FAILURE correctly', () => {
      const expectResult = {
        ...state,
        deleteBlogError: 'some error',
      };

      expect(blogListReducer(state, deleteBlog.failure('some error'))).toEqual(expectResult);
    });
  });
});
