import appSelectors from 'containers/App/selectors';

import { composeContainer } from 'meta-redux/dist/containers';
console.log(`composeContainer`, composeContainer);

import actionMeta from './actionMeta';
import { selectors, actions, reducer } from './redux-definitions';
import saga from './saga';
import Container from './Container';

module.exports = composeContainer(
  Container,
  actionMeta.key,
  { ...selectors, ...appSelectors },
  { ...actions },
  reducer,
  saga,
);
