import blogRendererReducer from '../reducer';
import { loadBlog, updateBlog } from '../actions';
import { initialState } from '../reducer';

describe('blogRendererReducer', () => {
  let state;

  beforeEach(() => {
    state = {
      ...initialState,
    };
  });

  it('should return the initial state', () => {
    expect(blogRendererReducer(undefined, {})).toEqual(state);
  });

  describe('loadBlog actions', () => {
    it('should handle the action loadBlog.TRIGGER correctly', () => {
      const expectResult = {
        ...state,
        blogId: 'some-blog',
      };

      expect(blogRendererReducer(state, loadBlog.trigger('some-blog'))).toEqual(expectResult);
    });

    it('should handle the action loadBlog.REQUEST correctly', () => {
      const expectResult = {
        ...state,
        loadingBlog: true,
      };

      expect(blogRendererReducer(state, loadBlog.request())).toEqual(expectResult);
    });

    it('should return the action loadBlog.SUCCESS correctly', () => {
      const expectResult = {
        ...state,
        blogs: { ['some-blog']: { id: 'some-blog', content: 'blurb' } },
      };

      expect(blogRendererReducer(state, loadBlog.success({ id: 'some-blog', content: 'blurb' }))).toEqual(expectResult);
    });

    it('should return the action loadBlog.FAILURE correctly', () => {
      const expectResult = {
        ...state,
        loadBlogError: 'some error',
      };

      expect(blogRendererReducer(state, loadBlog.failure('some error'))).toEqual(expectResult);
    });
  });

  describe('updateBlog actions', () => {
    it('should handle the action updateBlog.TRIGGER correctly', () => {
      const expectResult = {
        ...state,
        blogToUpdate: 'some-blog',
      };

      expect(blogRendererReducer(state, updateBlog.trigger('some-blog'))).toEqual(expectResult);
    });

    it('should handle the action updateBlog.REQUEST correctly', () => {
      const expectResult = {
        ...state,
        updatingBlog: true,
      };

      expect(blogRendererReducer(state, updateBlog.request())).toEqual(expectResult);
    });

    it('should return the action updateBlog.SUCCESS correctly', () => {
      const expectResult = {
        ...state,
      };

      expect(blogRendererReducer(state, updateBlog.success({ status: 200 }))).toEqual(expectResult);
    });

    it('should return the action updateBlog.FAILURE correctly', () => {
      const expectResult = {
        ...state,
        updateBlogError: 'some error',
      };

      expect(blogRendererReducer(state, updateBlog.failure('some error'))).toEqual(expectResult);
    });
  });
});
