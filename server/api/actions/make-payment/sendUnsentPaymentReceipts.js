import { datumLoad, datumUpdate } from '../datum';
import authentication from 'utils/authentication';
import { sendPaymentReceiptEmail } from 'utils/emailHelpers';
import reqSecure from 'utils/reqSecure';
import { find } from 'utils/find';
import { UNAUTHORISED_READ } from 'helpers/constants';
import stripePaymentsAllowedAttributes from './stripePaymentsAllowedAttributes';

export default function sendUnsentPaymentReceipts(payment) {
  console.log(`sendUnsentPaymentReceipts`);
  return new Promise((resolve, reject) => {
    resolve();
    return;
    //datumLoad({
    //  redisKey: 'stripepayments',
    //  filter: sp => sp.paymentId === payment.id && !sp.emailSent,
    //})
    //  .then(stripePayments => {
    //    console.log(`stripePayments`, stripePayments);

    //    fetchPaymentDataFromStripe(stripePayments)
    //      .then(paymentIntents => {
    //        const sendEmailPromises = paymentIntents.map(
    //          sPD =>
    //            new Promise((res, rej) => {
    //              console.log(`sPD`, sPD);
    //              if (sPD && sPD.charges && sPD.charges.data) {
    //                sPD.charges.data.forEach(d => {
    //                  if (d.amount > 0) {
    //                    console.log(`SEND EMAIL HERE!`);
    //                    //TODO sendPaymentReceiptEmail(payment, sPD);
    //                  }
    //                });
    //              }
    //              res(
    //                datumUpdate(
    //                  { redisKey: 'stripepayments' },
    //                  { body: { ...sPD, emailSent: true } },
    //                ),
    //              );
    //            }),
    //        );

    //        Promise.all(sendEmailPromises)
    //          .then(() => {
    //            resolve();
    //          })
    //          .error(err => {
    //            reject(err);
    //          });
    //      })
    //      .error(err => {
    //        reject(err);
    //      });
    //  })
    //  .catch(err => {
    //    reject(err);
    //  });
  });
}
