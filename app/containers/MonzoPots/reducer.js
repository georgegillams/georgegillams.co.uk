import { fromJS } from 'immutable';

import {
  LOAD_MONZO,
  LOAD_MONZO_ERROR,
  LOAD_MONZO_SUCCESS,
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR,
} from './constants';

const initialState = fromJS({
  monzoPots: null,
  password: '',
  loading: false,
  success: false,
  error: false,
  transactions: null,
  transactionsLoading: false,
  loadTransactionsSuccess: false,
  loadTransactionsError: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TRANSACTIONS:
      return state
        .set('transactionsLoading', true)
        .set('loadTransactionsError', false)
        .set('password', action.password);
    case LOAD_TRANSACTIONS_SUCCESS:
      return state
        .set('transactionsLoading', false)
        .set('transactions', action.transactions)
        .set('loadTransactionsSuccess', true);
    case LOAD_TRANSACTIONS_ERROR:
      return state
        .set('loadTransactionsError', action.error)
        .set('transactionsLoading', false);
    case LOAD_MONZO:
      return state
        .set('loading', true)
        .set('error', false)
        .set('password', action.password);
    case LOAD_MONZO_SUCCESS:
      return state
        .set('loading', false)
        .set('monzoPots', action.monzoPots)
        .set('success', true);
    case LOAD_MONZO_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
