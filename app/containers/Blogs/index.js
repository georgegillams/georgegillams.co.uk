import appSelectors from 'containers/App/selectors';

import { composeContainer } from 'helpers/redux';
import actionMeta from './actionMeta';
import { selectors, actions, reducer } from './redux-definitions';
import saga from './saga';
import BlogsPage from './BlogsPage';

module.exports = composeContainer(
  BlogsPage,
  actionMeta.key,
  { ...selectors, ...appSelectors },
  { ...actions },
  reducer,
  saga,
);
