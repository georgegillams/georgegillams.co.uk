import { datumLoad, datumLoadSingle } from '../datum';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';
import { UNAUTHORISED_READ } from 'helpers/constants';
import stripePaymentsAllowedAttributes from './stripePaymentsAllowedAttributes';

export default function loadSingle(req) {
  const reqSecured = reqSecure(req, stripePaymentsAllowedAttributes);
  return new Promise((resolve, reject) => {
    datumLoadSingle({
      redisKey: 'payments',
      filter: p => p.id === reqSecured.body.paymentId,
    })
      .then(payment => {
        datumLoad({
          redisKey: 'stripepayments',
          filter: sp => sp.paymentId === payment.id,
        })
          .then(stripePayments => {
            let outstandingBalance = payment.amount;
            stripePayments.forEach(spi => {
              outstandingBalance -= spi.amount;
            });
            resolve({
              ...payment,
              outstandingBalance: outstandingBalance,
              email: 'REDACTED',
            });
          })
          .catch(err => {
            resolve(err);
          });
      })
      .catch(err => {
        resolve(err);
      });
  });
}
