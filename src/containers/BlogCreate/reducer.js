import produce from 'immer';

import { createBlog } from './actions';

export const initialState = {
  blogToCreate: null,
  creatingBlog: false,
  createBlogError: null,
};

const reducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case createBlog.TRIGGER:
        draft.blogToCreate = payload;
        break;

      case createBlog.REQUEST:
        draft.creatingBlog = true;
        draft.createBlogError = null;
        break;

      case createBlog.SUCCESS:
        draft.creatingBlog = false;
        break;

      case createBlog.FAILURE:
        draft.creatingBlog = false;
        draft.createBlogError = payload;
        break;
    }
  });

export default reducer;
