import reducer from './reducer';

import createSelectors from 'meta-redux/dist/selectors';
import {
  inferPropertiesFromInitialState,
  getInitialState,
} from 'meta-redux/dist/reducers';

module.exports = createSelectors(
  'grammarML',
  inferPropertiesFromInitialState(getInitialState(reducer)),
);
