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
    LOAD_BLOG,
    attributes: ['blogId'],
  },
  {
    LOAD_BLOG_SUCCESS,
    attributes: ['blog'],
  },
  {
    LOAD_BLOG_ERROR,
    attributes: ['error'],
  },
  {
    UPDATE_BLOG,
    attributes: ['newBlog'],
  },
  {
    UPDATE_BLOG_SUCCESS,
    attributes: [],
  },
  {
    UPDATE_BLOG_ERROR,
    attributes: ['error'],
  },
  {
    CREATE_BLOG,
    attributes: ['newBlog'],
  },
  {
    CREATE_BLOG_SUCCESS,
    attributes: [],
  },
  {
    CREATE_BLOG_ERROR,
    attributes: ['error'],
  },
]);
