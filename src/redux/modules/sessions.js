const LOAD = 'redux-example/sessions/LOAD';
const LOAD_SUCCESS = 'redux-example/sessions/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/sessions/LOAD_FAIL';
const EDIT_START = 'redux-example/sessions/EDIT_START';
const EDIT_STOP = 'redux-example/sessions/EDIT_STOP';
const SAVE = 'redux-example/sessions/SAVE';
const SAVE_SUCCESS = 'redux-example/sessions/SAVE_SUCCESS';
const SAVE_FAIL = 'redux-example/sessions/SAVE_FAIL';
const UPDATE_NEW_DATA_AVAILABLE =
  'redux-example/sessions/UPDATE_NEW_DATA_AVAILABLE';

const initialState = {
  loaded: false,
  editing: {},
  saveError: {},
  contentLastUpdatedTimestamp: 0
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    case EDIT_START:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: true
        }
      };
    case EDIT_STOP:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: false
        }
      };
    case SAVE:
      return state; // 'saving' flag handled by redux-form
    case SAVE_SUCCESS:
      const data = [...state.data];
      data[action.result.id - 1] = action.result;
      return {
        ...state,
        data: data,
        editing: {
          ...state.editing,
          [action.id]: false
        },
        saveError: {
          ...state.saveError,
          [action.id]: null
        }
      };
    case SAVE_FAIL:
      return typeof action.error === 'string'
        ? {
          ...state,
          saveError: {
            ...state.saveError,
            [action.id]: action.error
          }
        }
        : state;
    case UPDATE_NEW_DATA_AVAILABLE:
      // console.log("action:");
      // console.log(action);

      const newState = {
        ...state,
        newDataAvailable: action.newValue
      };
      return newState;
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.session && globalState.session.loaded;
}

export function createSession() {
  // console.log("creating session");
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.post('/sessions/create') // params not used, just shown as demonstration
  };
}

export function updateNewDataAvailable(newValue) {
  // console.log(`updatingTimestamp: ${newTimestamp}`);
  return {
    types: [UPDATE_NEW_DATA_AVAILABLE],
    type: UPDATE_NEW_DATA_AVAILABLE,
    newValue: newValue
  };
}

export function keepAlive(sessionKey) {
  // console.log(`keeping session ${sessionKey} alive`);
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client =>
      client.post('/sessions/keepalive', {
        params: { 'Content-Type': 'application/json' },
        data: { sessionKey: sessionKey }
      }) // params not used, just shown as demonstration
  };
}

export function save(notification) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: notification.id,
    promise: client =>
      client.post('/sessions/update', {
        data: notification
      })
  };
}

export function editStart(id) {
  return { type: EDIT_START, id };
}

export function editStop(id) {
  return { type: EDIT_STOP, id };
}
