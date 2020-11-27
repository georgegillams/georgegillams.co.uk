import loadPayment from './private/loadPayment';
import stripePaymentsAllowedAttributes from './private/stripePaymentsAllowedAttributes';

import reqSecure from 'server-utils/common/reqSecure';
import lockPromise from 'server-utils/common/lock';

export default function loadSingle(req) {
  reqSecure(req, stripePaymentsAllowedAttributes);
  return lockPromise('stripepayments', () => loadPayment(req));
}
