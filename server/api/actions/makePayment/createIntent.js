/* eslint-disable */
import { dbCreate } from 'server-utils/common/database';

import loadPayment from './private/loadPayment';
import stripeInstance from './private/stripe';
import formatStripeError from './private/formatStripeError';
import stripePaymentsAllowedAttributes from './private/stripePaymentsAllowedAttributes';

import lockPromise from 'server-utils/common/lock';
import reqSecure from 'server-utils/common/reqSecure';

const createNewPaymentIntent = payment =>
  Promise.resolve().then(() => {
    if (payment.outstandingBalance < 30 && payment.outstandingBalance > 1000000) {
      return { id: null, client_secret: null };
    }
    return stripeInstance.paymentIntents.create({
      amount: payment.outstandingBalance,
      currency: 'gbp',
    });
  });

export default function createIntent(req) {
  reqSecure(req, stripePaymentsAllowedAttributes);
  return lockPromise(
    'stripepayments',
    () =>
      new Promise((resolve, reject) => {
        loadPayment(req)
          .then(payment => {
            createNewPaymentIntent(payment)
              .then(paymentIntent => {
                dbCreate(
                  { redisKey: 'stripepayments' },
                  {
                    body: {
                      paymentId: payment.id,
                      paymentIntentId: paymentIntent.id,
                      paymentIntentClientSecret: paymentIntent.client_secret,
                    },
                  }
                )
                  .then(() => {
                    resolve({
                      ...payment,
                      paymentIntentClientSecret: paymentIntent.client_secret,
                    });
                  })
                  .catch(err => {
                    reject(err);
                  });
              })
              .catch(err => {
                reject(formatStripeError(err));
              });
          })
          .catch(err => {
            reject(err);
          });
      })
  );
}
