import { datumCreate, datumLoad, datumLoadSingle } from '../datum';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';
import { UNAUTHORISED_READ } from 'helpers/constants';
import stripePaymentsAllowedAttributes from './stripePaymentsAllowedAttributes';
import stripeInstance from './stripe';
import load from './load';
import formatStripeError from './formatStripeError';

const createNewPaymentIntent = payment =>
  new Promise((resolve, reject) => {
    if (
      payment.outstandingBalance < 30 &&
      payment.outstandingBalance > 1000000
    ) {
      resolve({ id: null, client_secret: null });
    } else {
      resolve(
        stripeInstance.paymentIntents.create({
          amount: payment.outstandingBalance,
          currency: 'gbp',
        }),
      );
    }
  });

export default function createIntent(req) {
  const reqSecured = reqSecure(req, stripePaymentsAllowedAttributes);
  return new Promise((resolve, reject) => {
    load(reqSecured)
      .then(payment => {
        createNewPaymentIntent(payment)
          .then(paymentIntent => {
            datumCreate(
              { redisKey: 'stripepayments' },
              {
                body: {
                  paymentId: payment.id,
                  paymentIntentId: paymentIntent.id,
                  paymentIntentClientSecret: paymentIntent.client_secret,
                },
              },
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
  });
}
