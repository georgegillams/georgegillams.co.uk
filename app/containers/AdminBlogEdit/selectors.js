import createSelectors from 'helpers/redux/selectors';

module.exports = createSelectors('adminblogedit', [
  'blog',
  'loading',
  'success',
  'error',
  'updating',
  'updateSuccess',
  'updateError',
  'blogId',
  'newBlog',
  'id',
  'creating',
  'createSuccess',
  'createError',
]);
