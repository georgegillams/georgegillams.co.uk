import { datumLoad, datumLoadSingle, datumCreate, datumUpdate } from '../datum';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';
import { UNAUTHORISED_READ } from 'helpers/constants';
import { sendPaymentReceiptEmail } from 'utils/emailHelpers';
import { calculateOutstandingBalance } from 'helpers/ticketing';
import { find } from 'utils/find';
import stripePaymentsAllowedAttributes from './stripePaymentsAllowedAttributes';
import stripe from 'stripe';

const stripeInstance = stripe(process.env.STRIPE_SECRET_API_KEY);

export default function pay(req) {
  const reqSecured = reqSecure(req, stripePaymentsAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured)
      .then(user => {
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

                const { paymentToken, paymentAmount } = reqSecured.body;
                if (outstandingBalance !== paymentAmount) {
                  resolve({
                    error:
                      "Something's not adding up here, and we don't want to take the wrong amount. Please try again later.",
                  });
                  return;
                }

                stripeInstance.charges.create(
                  {
                    amount: outstandingBalance,
                    currency: 'gbp',
                    source: paymentToken, // obtained with Stripe.js
                    description: `George Gillams - online payment ${payment.id}`,
                  },
                  (err, charge) => {
                    if (err) {
                      resolve({ error: err.message });
                    } else {
                      charge.paymentId = payment.id;
                      datumCreate(
                        { redisKey: 'stripepayments', user },
                        { body: charge },
                      ).then(createdPayment => {
                        sendPaymentReceiptEmail(payment, charge);
                        resolve(createdPayment);
                      });
                    }
                  },
                ); // stripe charge end
              })
              .catch(err => {
                // end load stripepayments

                reject(err);
              });
          })
          .catch(err => {
            // end load payments
            reject(err);
          });
      })
      .catch(err => {
        // end authenticate
        reject(err);
      });
  });
}
