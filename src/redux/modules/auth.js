const LOAD = 'redux-example/auth/LOAD';
const LOAD_SUCCESS = 'redux-example/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/auth/LOAD_FAIL';
const REGISTER = 'redux-example/auth/REGISTER';
const REGISTER_SUCCESS = 'redux-example/auth/REGISTER_SUCCESS';
const REGISTER_FAIL = 'redux-example/auth/REGISTER_FAIL';
const REQUEST_MAGIC = 'redux-example/auth/REQUEST_MAGIC';
const REQUEST_MAGIC_SUCCESS = 'redux-example/auth/REQUEST_MAGIC_SUCCESS';
const REQUEST_MAGIC_FAIL = 'redux-example/auth/REQUEST_MAGIC_FAIL';
const VERIFY_EMAIL = 'redux-example/auth/VERIFY_EMAIL';
const VERIFY_EMAIL_SUCCESS = 'redux-example/auth/VERIFY_EMAIL_SUCCESS';
const VERIFY_EMAIL_FAIL = 'redux-example/auth/VERIFY_EMAIL_FAIL';
const LOGIN = 'redux-example/auth/LOGIN';
const LOGIN_SUCCESS = 'redux-example/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'redux-example/auth/LOGIN_FAIL';
const LOGOUT_ALL = 'redux-example/auth/LOGOUT_ALL';
const LOGOUT_ALL_SUCCESS = 'redux-example/auth/LOGOUT_ALL_SUCCESS';
const LOGOUT_ALL_FAIL = 'redux-example/auth/LOGOUT_ALL_FAIL';
const LOGOUT = 'redux-example/auth/LOGOUT';
const LOGOUT_SUCCESS = 'redux-example/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'redux-example/auth/LOGOUT_FAIL';

const initialState = {
  loaded: false
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
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case REGISTER:
      return {
        ...state,
        registering: true,
        registeringError: null
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registering: false,
        user: null,
        registeringError: null
      };
    case REGISTER_FAIL:
      return {
        ...state,
        registering: false,
        user: null,
        registeringError: action.error
      };
    case REQUEST_MAGIC:
      return {
        ...state,
        loggingIn: true
      };
    case REQUEST_MAGIC_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        magicLinkRequested: true
      };
    case REQUEST_MAGIC_FAIL:
      return {
        ...state,
        loggingIn: false,
        loginError: action.error
      };
    case VERIFY_EMAIL:
      return {
        ...state,
        verifyingEmail: true,
        emailVerificationError: null
      };
    case VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        verifyingEmail: false,
        user: action.result,
        emailVerificationError: null
      };
    case VERIFY_EMAIL_FAIL:
      return {
        ...state,
        verifyingEmail: false,
        user: null,
        emailVerificationError: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true,
        loginError: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result,
        loginError: null
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    case LOGOUT_ALL:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_ALL_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_ALL_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get('/loadAuth')
  };
}

export function requestMagicLink(credentials) {
  return {
    types: [REQUEST_MAGIC, REQUEST_MAGIC_SUCCESS, REQUEST_MAGIC_FAIL],
    promise: client =>
      client.post('/getmagiclink', {
        params: { 'Content-Type': 'application/json' },
        data: credentials
      })
  };
}

export function login(credentials) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: client =>
      client.post('/login', {
        params: { 'Content-Type': 'application/json' },
        data: credentials
      })
  };
}

export function loginMagic(key) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: client =>
      client.post('/loginmagiclink', {
        params: { 'Content-Type': 'application/json' },
        data: { magicLinkKey: key }
      })
  };
}

export function verifyEmail(key) {
  return {
    types: [VERIFY_EMAIL, VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_FAIL],
    promise: client =>
      client.post('/verifyemail', {
        params: { 'Content-Type': 'application/json' },
        data: { verificationKey: key }
      })
  };
}

export function createUser(user) {
  return {
    types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
    promise: client =>
      client.post('/users/create', {
        params: { 'Content-Type': 'application/json' },
        data: user
      })
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: client => client.post('/logout')
  };
}

export function logoutAll() {
  return {
    types: [LOGOUT_ALL, LOGOUT_ALL_SUCCESS, LOGOUT_ALL_FAIL],
    promise: client => client.post('/logoutall')
  };
}