import defineActions from 'helpers/redux/actions';
import {
  LOAD_BLOG,
  LOAD_BLOG_SUCCESS,
  LOAD_BLOG_ERROR,
  UPDATE_BLOG,
  UPDATE_BLOG_SUCCESS,
  UPDATE_BLOG_ERROR,
  CREATE_BLOG,
  CREATE_BLOG_ERROR,
  CREATE_BLOG_SUCCESS,
} from './constants';

module.exports = defineActions([
  {
    name: LOAD_BLOG,
    attributes: ['blogId'],
  },
  {
    name: LOAD_BLOG_SUCCESS,
    attributes: ['blog'],
  },
  {
    name: LOAD_BLOG_ERROR,
    attributes: ['error'],
  },
  {
    name: UPDATE_BLOG,
    attributes: ['newBlog'],
  },
  {
    name: UPDATE_BLOG_SUCCESS,
    attributes: [],
  },
  {
    name: UPDATE_BLOG_ERROR,
    attributes: ['error'],
  },
  {
    name: CREATE_BLOG,
    attributes: ['newBlog'],
  },
  {
    name: CREATE_BLOG_SUCCESS,
    attributes: [],
  },
  {
    name: CREATE_BLOG_ERROR,
    attributes: ['error'],
  },
]);
