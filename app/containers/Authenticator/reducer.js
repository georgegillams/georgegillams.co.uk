import { fromJS } from 'immutable';

import {
  REAUTHENTICATE,
  REAUTHENTICATE_ERROR,
  REAUTHENTICATE_SUCCESS,
} from './constants';

const initialState = fromJS({
  reauthenticating: false,
  error: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case REAUTHENTICATE:
      return state.set('reauthenticating', true).set('error', false);
    case REAUTHENTICATE_SUCCESS:
      return state.set('reauthenticating', false).set('success', true);
    case REAUTHENTICATE_ERROR:
      return state.set('error', action.error).set('reauthenticating', false);
    default:
      return state;
  }
}

export default appReducer;
