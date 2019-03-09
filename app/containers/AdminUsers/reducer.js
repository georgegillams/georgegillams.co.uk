import { fromJS } from 'immutable';
import {
  REQUEST_MAGIC_LINK_FOR_USER,
  LOAD_USERS,
  LOAD_USERS_ERROR,
  LOAD_USERS_SUCCESS,
} from './constants';

const initialState = fromJS({});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_MAGIC_LINK_FOR_USER:
      return state.set('magicLinkUser', action.magicLinkUser);
    case LOAD_USERS:
      return state.set('loading', true).set('error', false);
    case LOAD_USERS_SUCCESS:
      return state
        .set('loading', false)
        .set('success', true)
        .set('users', action.users);
    case LOAD_USERS_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default appReducer;
