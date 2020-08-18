import paymentsAllowedAttributes from './private/paymentsAllowedAttributes';

import { dbLoad } from 'utils/common/database';
import authentication from 'utils/common/authentication';
import reqSecure from 'utils/common/reqSecure';
import { UNAUTHORISED_READ } from 'utils/common/errorConstants';
import { associate } from 'helpers/common/objects';

export default function loadAll(req) {
  reqSecure(req, paymentsAllowedAttributes);
  let paymentData = null;
  return authentication(req)
    .then(user => {
      if (!user || !user.admin) {
        throw UNAUTHORISED_READ;
      }
      return true;
    })
    .then(() =>
      dbLoad({
        redisKey: 'payments',
        includeDeleted: true,
      })
    )
    .then(result => {
      paymentData = result;
      return true;
    })
    .then(() =>
      dbLoad({
        redisKey: 'stripepayments',
        includeDeleted: true,
      })
    )
    .then(charges => {
      const result = associate(paymentData, charges, 'id', 'paymentId', 'charge', false);
      return result;
    });
}
