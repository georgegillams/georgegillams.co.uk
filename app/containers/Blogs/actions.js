import { LOAD_BLOGS, LOAD_BLOGS_SUCCESS, LOAD_BLOGS_ERROR } from './constants';

export function loadBlogs() {
  return {
    type: LOAD_BLOGS,
  };
}

export function blogsLoaded(blogs) {
  return {
    type: LOAD_BLOGS_SUCCESS,
    blogs,
  };
}

export function blogsLoadingError(error) {
  return {
    type: LOAD_BLOGS_ERROR,
    error,
  };
}
