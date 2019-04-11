import {
  LOAD_BLOGS,
  LOAD_BLOGS_SUCCESS,
  LOAD_BLOGS_ERROR,
  DELETE_BLOG,
  DELETE_BLOG_ERROR,
  DELETE_BLOG_SUCCESS,
  CREATE_BLOG,
  CREATE_BLOG_ERROR,
  CREATE_BLOG_SUCCESS,
} from './constants';

export function loadBlogs() {
  return {
    type: LOAD_BLOGS,
  };
}

export function loadBlogsSuccess(blogs) {
  return {
    type: LOAD_BLOGS_SUCCESS,
    blogs,
  };
}

export function loadBlogsError(error) {
  return {
    type: LOAD_BLOGS_ERROR,
    error,
  };
}

export function deleteBlog(blog) {
  return {
    type: DELETE_BLOG,
    blog,
  };
}

export function deleteBlogSuccess() {
  return {
    type: DELETE_BLOG_SUCCESS,
  };
}

export function deleteBlogError(error) {
  return {
    type: DELETE_BLOG_ERROR,
    error,
  };
}

export function createBlog(id) {
  return { type: CREATE_BLOG, id };
}

export function createBlogSuccess() {
  return { type: CREATE_BLOG_SUCCESS };
}

export function createBlogError(error) {
  return { type: CREATE_BLOG_ERROR, error };
}
