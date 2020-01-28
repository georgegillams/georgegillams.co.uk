import { datumLoad, datumLoadSingle, datumUpdate } from '../datum';
import { sendPaymentReceiptEmail } from 'utils/emailHelpers';
import fetchPaymentDataFromStripe from './fetchPaymentDataFromStripe';

const markPaymentIntentEmailSent = paymentId =>
  new Promise((resolve, reject) => {
    datumLoadSingle({
      redisKey: 'stripepayments',
      filter: sp => sp.paymentId === paymentId,
    })
      .then(payment => {
        resolve(
          datumUpdate(
            { redisKey: 'stripepayments' },
            { body: { ...payment, emailSent: true } },
          ),
        );
      })
      .catch(err => {
        reject(err);
      });
  });

export default function sendUnsentPaymentReceipts(payment) {
  return new Promise((resolve, reject) => {
    datumLoad({
      redisKey: 'stripepayments',
      filter: sp => sp.paymentId === payment.id && !sp.emailSent,
    })
      .then(stripePayments => {
        fetchPaymentDataFromStripe(stripePayments)
          .then(paymentIntents => {
            const sendEmailPromises = [];

            paymentIntents.forEach(pI => {
              if (pI) {
                pI.charges.data.forEach(pICD => {
                  if (pICD.amount > 0) {
                    sendPaymentReceiptEmail(payment, pICD);
                  }
                });
                sendEmailPromises.push(
                  markPaymentIntentEmailSent(pI.stripepayment.paymentId),
                );
              }
            });

            Promise.all(sendEmailPromises)
              .then(() => {
                resolve();
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
