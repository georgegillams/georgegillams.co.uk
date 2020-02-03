const actionMeta = {
  key: 'usertoedit_edit',
  actionDefinitions: [
    {
      LOAD_USERTOEDIT: 'tbd',
      attributes: ['usertoeditId'],
      stateMutations: {
        loadingUsertoedit: true,
        loadUsertoeditError: null,
        usertoeditId: action => action.usertoeditId,
      },
    },
    {
      LOAD_USERTOEDIT_REGISTER_SUCCESS: 'tbd',
      attributes: ['usertoedit'],
      stateMutations: {
        loadingUsertoedit: false,
        loadUsertoeditSuccess: true,
        usertoedit: action => action.usertoedit,
      },
    },
    {
      LOAD_USERTOEDIT_REGISTER_ERROR: 'tbd',
      attributes: ['loadUsertoeditError'],
      stateMutations: {
        loadingUsertoedit: false,
        loadUsertoeditError: action => action.loadUsertoeditError,
      },
    },
    {
      UPDATE_USERTOEDIT: 'tbd',
      attributes: ['newUsertoedit'],
      stateMutations: {
        updatingUsertoedit: true,
        updateUsertoeditError: null,
        newUsertoedit: action => action.newUsertoedit,
      },
    },
    {
      UPDATE_USERTOEDIT_REGISTER_SUCCESS: 'tbd',
      attributes: [],
      stateMutations: {
        updatingUsertoedit: false,
        updateUsertoeditSuccess: true,
      },
    },
    {
      UPDATE_USERTOEDIT_REGISTER_ERROR: 'tbd',
      attributes: ['updateUsertoeditError'],
      stateMutations: {
        updatingUsertoedit: false,
        updateUsertoeditError: action => action.updateUsertoeditError,
      },
    },
  ],
};

export default actionMeta;
