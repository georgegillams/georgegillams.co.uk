import {
  LOAD_BLOG,
  LOAD_BLOG_SUCCESS,
  LOAD_BLOG_ERROR,
  UPDATE_BLOG,
  UPDATE_BLOG_SUCCESS,
  UPDATE_BLOG_ERROR,
} from './constants';

export function loadBlog(blogId) {
  return {
    type: LOAD_BLOG,
    blogId,
  };
}

export function loadBlogSuccess(blog) {
  return {
    type: LOAD_BLOG_SUCCESS,
    blog,
  };
}

export function loadBlogError(error) {
  return {
    type: LOAD_BLOG_ERROR,
    error,
  };
}

export function updateBlog(newBlog) {
  return {
    type: UPDATE_BLOG,
    newBlog,
  };
}

export function updateBlogSuccess() {
  return {
    type: UPDATE_BLOG_SUCCESS,
  };
}

export function updateBlogError(error) {
  return {
    type: UPDATE_BLOG_ERROR,
    error,
  };
}
