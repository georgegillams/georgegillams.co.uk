const actionDefinitions = [
  {
    LOAD_MONZO: 'tbd',
    attributes: ['password'],
  },
  {
    LOAD_MONZO_SUCCESS: 'tbd',
    attributes: ['monzoPots'],
  },
  {
    LOAD_MONZO_ERROR: 'tbd',
    attributes: ['error'],
  },
  {
    LOAD_TRANSACTIONS: 'tbd',
    attributes: ['password'],
  },
  {
    LOAD_TRANSACTIONS_SUCCESS: 'tbd',
    attributes: ['transactions'],
  },
  {
    LOAD_TRANSACTIONS_ERROR: 'tbd',
    attributes: ['loadTransactionsError'],
  },
];

export default actionDefinitions;
