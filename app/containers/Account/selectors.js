import actionMeta from './actionMeta';
import reducer from './reducer';

import createSelectors from 'meta-redux/dist/selectors';
import {
  inferPropertiesFromInitialState,
  getInitialState,
} from 'meta-redux/dist/reducers';

module.exports = createSelectors(
  actionMeta.key,
  inferPropertiesFromInitialState(getInitialState(reducer)),
);
