import { NetworkError } from 'server-utils/common/errors';

const formatStripeError = err => {
  let error = err;
  if (error.raw.message) {
    error = new NetworkError(error.raw.message);
  }
  return error;
};

export default formatStripeError;
