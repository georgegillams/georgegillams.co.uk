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
    LOAD_BLOGS,
    attributes: [],
  },
  {
    LOAD_BLOGS_SUCCESS,
    attributes: ['blogs'],
  },
  {
    LOAD_BLOGS_ERROR,
    attributes: ['error'],
  },
  {
    DELETE_BLOG,
    attributes: ['blog'],
  },
  {
    DELETE_BLOG_SUCCESS,
    attributes: [],
  },
  {
    DELETE_BLOG_ERROR,
    attributes: ['error'],
  },
]);
