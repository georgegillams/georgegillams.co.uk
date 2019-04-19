import defineActions from 'helpers/redux/actions';
import {
  LOAD_BLOGS,
  LOAD_BLOGS_SUCCESS,
  LOAD_BLOGS_ERROR,
  DELETE_BLOG,
  DELETE_BLOG_ERROR,
  DELETE_BLOG_SUCCESS,
} from './constants';

module.exports = defineActions([
  {
    name: LOAD_BLOGS,
    attributes: [],
  },
  {
    name: LOAD_BLOGS_SUCCESS,
    attributes: ['blogs'],
  },
  {
    name: LOAD_BLOGS_ERROR,
    attributes: ['error'],
  },
  {
    name: DELETE_BLOG,
    attributes: ['blog'],
  },
  {
    name: DELETE_BLOG_SUCCESS,
    attributes: [],
  },
  {
    name: DELETE_BLOG_ERROR,
    attributes: ['error'],
  },
]);
