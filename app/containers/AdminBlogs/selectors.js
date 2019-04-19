import createSelectors from 'helpers/redux/selectors';

module.exports = createSelectors('adminblogs', [
  'blogs',
  'loading',
  'success',
  'error',
  'blogToDelete',
  'deleting',
  'deleteSuccess',
  'deleteError',
]);
