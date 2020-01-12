const actionMeta = {
  key: 'stripe-payments',
  actionDefinitions: [
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
