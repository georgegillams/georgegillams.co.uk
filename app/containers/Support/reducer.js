import { fromJS } from 'immutable';
import { createInitialState, createAppReducer } from 'helpers/redux/reducers';

import constants from './constants';
import actionMeta from './actionMeta';

const initialStateObj = createInitialState(actionMeta.actionDefinitions);
const initialState = fromJS(initialStateObj);

const appReducer = createAppReducer(
  actionMeta.actionDefinitions,
  constants,
  initialState,
);

export default appReducer;
