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
      MAKE_PAYMENT_INTENT: 'tbd',
      attributes: ['onMakePaymentIntentRegisterSuccess'],
      stateMutations: {
        onMakePaymentIntentRegisterSuccess: action =>
          action.onMakePaymentIntentRegisterSuccess,
        makePaymentIntentLoading: true,
        makePaymentIntentError: null,
      },
    },
    {
      MAKE_PAYMENT_INTENT_REGISTER_SUCCESS: 'tbd',
      attributes: ['paymentIntent'],
      stateMutations: {
        paymentIntent: action => action.paymentIntent,
        makePaymentIntentLoading: false,
        makePaymentIntentSuccess: true,
      },
    },
    {
      MAKE_PAYMENT_INTENT_REGISTER_ERROR: 'tbd',
      attributes: ['error'],
      stateMutations: {
        makePaymentIntentError: action => action.error,
        makePaymentIntentLoading: false,
        makePaymentIntentSuccess: false,
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
      attributes: ['paymentError'],
      stateMutations: {
        makePaymentError: action => action.paymentError,
        makePaymentLoading: false,
        makePaymentSuccess: false,
      },
    },
  ],
};

export default actionMeta;
