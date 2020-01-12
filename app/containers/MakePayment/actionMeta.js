const actionMeta = {
  key: 'make-payments',
  actionDefinitions: [
    {
      LOAD_PAYMENT: 'tbd',
      attributes: ['paymentId'],
      stateMutations: {
        paymentId: action => action.paymentId,
        loadPaymentLoading: true,
        loadPaymentError: null,
      },
    },
    {
      LOAD_PAYMENT_REGISTER_SUCCESS: 'tbd',
      attributes: ['payment'],
      stateMutations: {
        payment: action => action.payment,
        loadPaymentLoading: false,
        loadPaymentSuccess: true,
      },
    },
    {
      LOAD_PAYMENT_REGISTER_ERROR: 'tbd',
      attributes: ['paymentError'],
      stateMutations: {
        loadPaymentError: action => action.paymentError,
        loadPaymentLoading: false,
        loadPaymentSuccess: false,
      },
    },
    {
      PAYMENT_TOKEN_CHANGED: 'tbd',
      attributes: ['paymentToken'],
      stateMutations: {
        paymentToken: action => action.paymentToken,
      },
    },
    {
      MAKE_PAYMENT: 'tbd',
      attributes: [],
      stateMutations: {
        makePaymentLoading: true,
        makePaymentError: null,
      },
    },
    {
      MAKE_PAYMENT_REGISTER_SUCCESS: 'tbd',
      attributes: [],
      stateMutations: {
        makePaymentLoading: false,
        makePaymentSuccess: true,
      },
    },
    {
      MAKE_PAYMENT_REGISTER_ERROR: 'tbd',
      attributes: ['patmentError'],
      stateMutations: {
        makePaymentError: action => action.patmentError,
        makePaymentLoading: false,
        makePaymentSuccess: false,
      },
    },
  ],
};

export default actionMeta;
