import appSelectors from 'containers/App/selectors';
import appActions from 'containers/App/actions';

import { composeContainer } from 'helpers/redux';
import actionMeta from './actionMeta';
import { selectors, actions, reducer } from './redux-definitions';
import saga from './saga';
import SignUp from './SignUp';

module.exports = composeContainer(
  SignUp,
  actionMeta.key,
  { ...selectors, ...appSelectors },
  { ...actions, appActions },
  reducer,
  saga,
);
