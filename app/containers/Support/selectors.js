import reducer from './reducer';
import actionMeta from './actionMeta';

import createSelectors from 'helpers/redux/selectors';
import {
  inferPropertiesFromInitialState,
  initialState,
} from 'helpers/redux/reducers';

module.exports = createSelectors(
  actionMeta.key,
  inferPropertiesFromInitialState(initialState(reducer)),
);
