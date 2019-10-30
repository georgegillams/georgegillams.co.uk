// Note that the `stateMutations` here are not used to construct the reducer because it contains fidely logic.

const actionMeta = {
  key: 'global',
  actionDefinitions: [
    {
      SET_USER: 'tbd',
      attributes: ['user'],
      stateMutations: {
        user: action => action.user,
        userLoading: false,
      },
    },
    {
      SET_USER_LOADING: 'tbd',
      attributes: [],
      stateMutations: {
        userLoading: true,
      },
    },
    {
      SET_LOGIN_REDIRECT: 'tbd',
      attributes: ['loginRedirect'],
      stateMutations: {
        loginRedirect: action => action.loginRedirect,
      },
    },
    {
      SET_COOKIES_ALLOWED: 'tbd',
      attributes: ['cookiesAllowed'],
      stateMutations: {
        cookiesAllowed: action => action.cookiesAllowed,
      },
    },
  ],
};

export default actionMeta;
