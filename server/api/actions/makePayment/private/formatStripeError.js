import { NetworkError } from 'utils/errors';

const formatStripeError = err => {
  let error = err;
  if (error.raw.message) {
    error = new NetworkError(error.raw.message);
  }
  return error;
};

export default formatStripeError;
