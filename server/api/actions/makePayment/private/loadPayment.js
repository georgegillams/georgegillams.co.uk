/* eslint-disable */
import lockPromise from 'server-utils/common/lock';

import getPaymentAndBalance from './getPaymentAndBalance';
import sendUnsentPaymentReceipts from './sendUnsentPaymentReceipts';

export default function loadSingle(req) {
  return new Promise((resolve, reject) => {
    getPaymentAndBalance(req.body.paymentId)
      .then(payment => {
        sendUnsentPaymentReceipts(payment)
          .then(() => {
            resolve({
              ...payment,
              email: 'REDACTED',
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
