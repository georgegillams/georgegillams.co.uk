import { datumCreate, datumLoad, datumLoadSingle } from '../datum';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';
import { UNAUTHORISED_READ } from 'helpers/constants';
import stripePaymentsAllowedAttributes from './stripePaymentsAllowedAttributes';
import stripeInstance from './stripe';
import getPaymentAndBalance from './getPaymentAndBalance';
import sendUnsentPaymentReceipts from './sendUnsentPaymentReceipts';

export default function loadSingle(req) {
  const reqSecured = reqSecure(req, stripePaymentsAllowedAttributes);
  return new Promise((resolve, reject) => {
    getPaymentAndBalance(reqSecured.body.paymentId)
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
