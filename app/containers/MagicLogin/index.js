import appSelectors from 'containers/App/selectors';
import appActions from 'containers/App/actions';

import { composeContainer } from 'helpers/redux';
import actionMeta from './actionMeta';
import { selectors, actions, reducer } from './redux-definitions';
import saga from './saga';
import MagicLogin from './MagicLogin';

module.exports = composeContainer(
  MagicLogin,
  actionMeta.key,
  { ...selectors, ...appSelectors },
  { ...actions, appActions },
  reducer,
  saga,
);
