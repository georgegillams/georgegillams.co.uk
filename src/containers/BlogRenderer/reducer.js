import produce from 'immer';

import { loadBlog, updateBlog } from './actions';

export const initialState = {
  blogs: {},
  loadingBlog: false,
  loadBlogError: null,

  blogToUpdate: null,
  updatingBlog: false,
  updateBlogError: null,
};

const reducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case loadBlog.TRIGGER:
        draft.blogId = payload;
        break;

      case loadBlog.REQUEST:
        draft.loadingBlog = true;
        draft.loadBlogError = null;
        break;

      case loadBlog.SUCCESS:
        draft.loadingBlog = false;
        if (payload.id) {
          draft.blogs[payload.id] = payload;
        }
        break;

      case loadBlog.FAILURE:
        draft.loadingBlog = false;
        draft.loadBlogError = payload;
        break;

      case updateBlog.TRIGGER:
        draft.blogToUpdate = payload;
        break;

      case updateBlog.REQUEST:
        draft.updatingBlog = true;
        draft.updateBlogError = null;
        break;

      case updateBlog.SUCCESS:
        draft.updatingBlog = false;
        break;

      case updateBlog.FAILURE:
        draft.updatingBlog = false;
        draft.updateBlogError = payload;
        break;
    }
  });

export default reducer;
