/* eslint-disable */
import { dbLoad } from 'server-utils/common/database';

import sendPaymentReceiptEmail from './private/sendPaymentReceiptEmail';
import stripePaymentsAllowedAttributes from './private/stripePaymentsAllowedAttributes';

import authentication from 'server-utils/common/authentication';
import reqSecure from 'server-utils/common/reqSecure';
import { find } from 'server-utils/common/find';
import { UNAUTHORISED_READ } from 'server-utils/common/errorConstants';

export default function resendPaymentReceipt(req) {
  // TODO rewrite to use payment email
  reqSecure(req, stripePaymentsAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        if (user && user.admin) {
          const userIdToResendTo = req.body.resendId;
          dbLoad({
            redisKey: 'users',
          }).then(userData => {
            dbLoad({
              redisKey: 'stripepayments',
            }).then(paymentData => {
              const { existingValue: paymentToResend } = find(paymentData, userIdToResendTo, 'authorId');
              const { existingValue: existingUser } = find(userData, userIdToResendTo);
              if (existingUser && paymentToResend) {
                sendPaymentReceiptEmail(existingUser, paymentToResend).then(() => resolve());
              }
            });
          });
        } else {
          reject(UNAUTHORISED_READ);
        }
      },
      err => reject(err)
    );
  });
}
