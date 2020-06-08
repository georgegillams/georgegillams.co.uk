import { datumLoad } from '../datum';

import paymentsAllowedAttributes from './private/paymentsAllowedAttributes';

import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';
import { UNAUTHORISED_READ } from 'utils/errorConstants';
import { associate } from 'helpers/objects';

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
      datumLoad({
        redisKey: 'payments',
        includeDeleted: true,
      }),
    )
    .then(result => {
      paymentData = result;
      return true;
    })
    .then(() =>
      datumLoad({
        redisKey: 'stripepayments',
        includeDeleted: true,
      }),
    )
    .then(charges => {
      const result = associate(
        paymentData,
        charges,
        'id',
        'paymentId',
        'charge',
        false,
      );
      return result;
    });
}
