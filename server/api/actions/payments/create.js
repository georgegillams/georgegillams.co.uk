import { datumCreate } from '../datum';

import paymentsAllowedAttributes from './private/paymentsAllowedAttributes';

import lockPromise from 'utils/lock';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';

export default function create(req) {
  reqSecure(req, paymentsAllowedAttributes);
  return lockPromise(
    'payments',
    () =>
      new Promise((resolve, reject) => {
        authentication(req).then(
          user => {
            if (req.body.amount < 30) {
              reject({
                error: 'invalid-input',
                errorMessage: 'Payments under 30p are not possible.',
              });
              return;
            }
            if (req.body.amount > 1000000) {
              reject({
                error: 'invalid-input',
                errorMessage: 'Payments over £10,000 are not possible.',
              });
              return;
            }
            resolve(datumCreate({ redisKey: 'payments', user }, req));
          },
          err => reject(err),
        );
      }),
  );
}
