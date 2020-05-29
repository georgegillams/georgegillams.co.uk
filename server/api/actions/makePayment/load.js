import loadPayment from './private/loadPayment';
import stripePaymentsAllowedAttributes from './private/stripePaymentsAllowedAttributes';
import getPaymentAndBalance from './private/getPaymentAndBalance';
import sendUnsentPaymentReceipts from './private/sendUnsentPaymentReceipts';

import reqSecure from 'utils/reqSecure';
import lockPromise from 'utils/lock';

export default function loadSingle(req) {
  reqSecure(req, stripePaymentsAllowedAttributes);
  return lockPromise('stripepayments', () => loadPayment(req));
}
