import produce from 'immer';

import { loadBlogs, deleteBlog } from './actions';

export const initialState = {
  blogs: null,
  loadingBlogs: false,
  loadBlogsError: null,

  blogToDelete: null,
  deletingBlog: false,
  deleteBlogError: null,
};

const reducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case loadBlogs.REQUEST:
        draft.loadingBlogs = true;
        draft.loadBlogsError = null;
        break;

      case loadBlogs.SUCCESS:
        draft.loadingBlogs = false;
        draft.blogs = payload.blogs;
        break;

      case loadBlogs.FAILURE:
        draft.loadingBlogs = false;
        draft.loadBlogsError = payload;
        break;

      case deleteBlog.TRIGGER:
        draft.blogToDelete = payload;
        break;

      case deleteBlog.REQUEST:
        draft.deletingBlog = true;
        draft.deleteBlogError = null;
        break;

      case deleteBlog.SUCCESS:
        draft.deletingBlog = false;
        break;

      case deleteBlog.FAILURE:
        draft.deletingBlog = false;
        draft.deleteBlogError = payload;
        break;
    }
  });

export default reducer;
