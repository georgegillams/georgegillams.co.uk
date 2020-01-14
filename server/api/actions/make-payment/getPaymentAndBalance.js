import { datumLoad, datumLoadSingle } from '../datum';
import stripeInstance from './stripe';
import formatStripeError from './formatStripeError';

const getPaymentIntent = paymentIntentId =>
  new Promise((resolve, reject) => {
    if (paymentIntentId) {
      resolve(stripeInstance.paymentIntents.retrieve(paymentIntentId));
    } else {
      resolve(null);
    }
  });

export default function getPaymentAndBalance(paymentId) {
  return new Promise((resolve, reject) => {
    datumLoadSingle({
      redisKey: 'payments',
      filter: p => p.id === paymentId,
    })
      .then(payment => {
        datumLoad({
          redisKey: 'stripepayments',
          filter: sp => sp.paymentId === payment.id,
        })
          .then(stripePayments => {
            let outstandingBalance = payment.amount;

            const stripePaymentIntentPromises = stripePayments.map(sp => {
              return new Promise((res, rej) => {
                // get paid amount from stripe's server
                getPaymentIntent(sp.paymentIntentId)
                  .then(paymentIntent => {
                    res(paymentIntent);
                  })
                  .catch(err => {
                    rej(formatStripeError(err));
                  });
              });
            });

            Promise.all(stripePaymentIntentPromises)
              .then(stripePaymentIntents => {
                stripePaymentIntents.forEach(paymentIntent => {
                  if (paymentIntent) {
                    paymentIntent.charges.data.forEach(d => {
                      if (d.paid) {
                        outstandingBalance -= d.amount;
                      }
                    });
                  }
                });

                resolve({
                  ...payment,
                  amount: Math.round(payment.amount),
                  outstandingBalance: Math.round(outstandingBalance),
                });
              })
              .catch(err => {
                reject(err);
              });
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
}
