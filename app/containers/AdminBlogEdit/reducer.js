import { fromJS } from 'immutable';
import {
  UPDATE_BLOG,
  UPDATE_BLOG_ERROR,
  UPDATE_BLOG_SUCCESS,
  LOAD_BLOG,
  LOAD_BLOG_ERROR,
  LOAD_BLOG_SUCCESS,
} from './constants';

const initialState = fromJS({});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BLOG:
      return state
        .set('loading', true)
        .set('error', false)
        .set('blogId', action.blogId);
    case LOAD_BLOG_SUCCESS:
      return state
        .set('loading', false)
        .set('success', true)
        .set('blog', action.blog);
    case LOAD_BLOG_ERROR:
      return state.set('loading', false).set('error', action.error);
    case UPDATE_BLOG:
      return state
        .set('updating', true)
        .set('updateError', false)
        .set('newBlog', action.newBlog);
    case UPDATE_BLOG_SUCCESS:
      return state.set('updating', false).set('updateSuccess', true);
    case UPDATE_BLOG_ERROR:
      return state.set('updating', false).set('updateErrorrror', action.error);
    default:
      return state;
  }
}

export default appReducer;
