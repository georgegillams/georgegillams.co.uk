const actionMeta = {
  key: 'monzo',
  actionDefinitions: [
    {
      LOAD_POTS: 'tbd',
      attributes: ['password'],
      stateMutations: {
        password: action => action.password,
        loadingPots: true,
        loadPotsError: null,
      },
    },
    {
      LOAD_POTS_REGISTER_SUCCESS: 'tbd',
      attributes: ['pots'],
      stateMutations: {
        loadingPots: false,
        loadPotsSuccess: true,
        pots: action => action.pots,
      },
    },
    {
      LOAD_POTS_REGISTER_ERROR: 'tbd',
      attributes: ['loadPotsError'],
      stateMutations: {
        loadingPots: false,
        loadPotsSuccess: false,
        loadPotsError: action => action.loadPotsError,
      },
    },
    {
      LOAD_TRANSACTIONS: 'tbd',
      attributes: ['password'],
      password: action => action.password,
      stateMutations: {
        loadingTransactions: true,
        loadTransactionsError: null,
      },
    },
    {
      LOAD_TRANSACTIONS_REGISTER_SUCCESS: 'tbd',
      attributes: ['transactions'],
      stateMutations: {
        loadingTransactions: false,
        loadTransactionsSuccess: true,
        transactions: action => action.transactions,
      },
    },
    {
      LOAD_TRANSACTIONS_REGISTER_ERROR: 'tbd',
      attributes: ['loadTransactionsError'],
      stateMutations: {
        loadingTransactions: false,
        loadTransactionsSuccess: false,
        loadTransactionsError: action => action.loadTransactionsError,
      },
    },
  ],
};

export default actionMeta;
