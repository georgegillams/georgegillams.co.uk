import loadPayment from './private/loadPayment';
import stripePaymentsAllowedAttributes from './private/stripePaymentsAllowedAttributes';

import reqSecure from 'utils/reqSecure';
import lockPromise from 'utils/lock';

export default function loadSingle(req) {
  reqSecure(req, stripePaymentsAllowedAttributes);
  return lockPromise('stripepayments', () => loadPayment(req));
}
