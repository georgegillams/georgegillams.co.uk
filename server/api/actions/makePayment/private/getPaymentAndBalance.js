/* eslint-disable */
import { dbLoad, dbLoadSingle } from 'server-utils/common/database';

import fetchPaymentDataFromStripe from './fetchPaymentDataFromStripe';

export default function getPaymentAndBalance(paymentId) {
  return new Promise((resolve, reject) => {
    dbLoadSingle({
      redisKey: 'payments',
      filter: p => p.id === paymentId,
    })
      .then(payment => {
        dbLoad({
          redisKey: 'stripepayments',
          filter: sp => sp.paymentId === payment.id,
        })
          .then(stripePayments => {
            let outstandingBalance = payment.amount;
            fetchPaymentDataFromStripe(stripePayments)
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
