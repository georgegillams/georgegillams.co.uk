import {
  BLOG_ID_CHANGED,
  LOAD_BLOG,
  LOAD_BLOG_SUCCESS,
  LOAD_BLOG_ERROR,
} from './constants';

export function blogIdChanged(newValue) {
  return {
    type: BLOG_ID_CHANGED,
    blogId: newValue,
  };
}

export function loadBlog() {
  return {
    type: LOAD_BLOG,
  };
}

export function blogLoaded(blog) {
  return {
    type: LOAD_BLOG_SUCCESS,
    blog,
  };
}

export function blogLoadingError(error) {
  return {
    type: LOAD_BLOG_ERROR,
    error,
  };
}
