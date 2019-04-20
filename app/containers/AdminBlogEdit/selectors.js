import createSelectors from 'helpers/redux/selectors';
import { inferPropertiesFromInitialState } from 'helpers/redux/reducers';
import { initialState } from './reducer';

module.exports = createSelectors(
  'adminblogedit',
  inferPropertiesFromInitialState(initialState),
);
