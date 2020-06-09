import { InvalidInputError } from '../../../utils/errors';

import paymentsAllowedAttributes from './private/paymentsAllowedAttributes';

import { dbCreate } from 'utils/database';
import lockPromise from 'utils/lock';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';

export default function create(req) {
  reqSecure(req, paymentsAllowedAttributes);
  return lockPromise('payments', () =>
    authentication(req).then(user => {
      if (req.body.amount < 30) {
        throw new InvalidInputError('Payments under 30p are not possible.');
      }
      if (req.body.amount > 1000000) {
        throw new InvalidInputError('Payments over £10,000 are not possible.');
      }
      return dbCreate({ redisKey: 'payments', user }, req);
    }),
  );
}
