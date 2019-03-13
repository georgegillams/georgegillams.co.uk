import {
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
  SET_LOGIN_REDIRECT,
  SET_USER,
  SET_USER_LOADING,
  SET_COOKIES_ALLOWED,
} from './constants';

export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}

export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}

export function setUserLoading() {
  return {
    type: SET_USER_LOADING,
  };
}

export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

export function setLoginRedirect(loginRedirect) {
  console.log(`setting the login redirect`);
  return {
    type: SET_LOGIN_REDIRECT,
    loginRedirect,
  };
}

export function setCookiesAllowed(cookiesAllowed) {
  return {
    type: SET_COOKIES_ALLOWED,
    cookiesAllowed,
  };
}
