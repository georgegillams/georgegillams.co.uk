const actionMeta = {
  key: 'payment-form',
  actionDefinitions: [
    {
      LOAD_PAYMENTS: 'tbd',
      attributes: [],
      stateMutations: {
        loadingPayments: true,
        loadPaymentsError: null,
      },
    },
    {
      LOAD_PAYMENTS_REGISTER_SUCCESS: 'tbd',
      attributes: ['payments'],
      stateMutations: {
        loadingPayments: false,
        loadPaymentsSuccess: true,
        payments: action => action.payments,
      },
    },
    {
      LOAD_PAYMENTS_REGISTER_ERROR: 'tbd',
      attributes: ['loadPaymentsError'],
      stateMutations: {
        loadingPayments: false,
        loadPaymentsSuccess: false,
        loadPaymentsError: action => action.loadPaymentsError,
      },
    },
    {
      ADD_PAYMENT: 'tbd',
      attributes: ['paymentDefinition'],
      stateMutations: {
        paymentDefinition: action => action.paymentDefinition,
        addPaymentLoading: true,
        addPaymentError: null,
      },
    },
    {
      ADD_PAYMENT_REGISTER_SUCCESS: 'tbd',
      attributes: [],
      stateMutations: {
        addPaymentLoading: false,
        addPaymentSuccess: true,
      },
    },
    {
      ADD_PAYMENT_REGISTER_ERROR: 'tbd',
      attributes: ['addPaymentError'],
      stateMutations: {
        addPaymentError: action => action.addPaymentError,
        addPaymentLoading: false,
        addPaymentSuccess: false,
      },
    },
    {
      DELETE_PAYMENT: 'tbd',
      attributes: ['paymentToDelete'],
      stateMutations: {
        paymentToDelete: action => action.paymentToDelete,
        deletePaymentLoading: true,
        deletePaymentError: null,
      },
    },
    {
      DELETE_PAYMENT_REGISTER_SUCCESS: 'tbd',
      attributes: [],
      stateMutations: {
        deletePaymentLoading: false,
        deletePaymentSuccess: true,
      },
    },
    {
      DELETE_PAYMENT_REGISTER_ERROR: 'tbd',
      attributes: ['deletePaymentError'],
      stateMutations: {
        deltePaymentError: action => action.addPaymentError,
        deltePaymentLoading: false,
        deltePaymentSuccess: false,
      },
    },
  ],
};

export default actionMeta;
