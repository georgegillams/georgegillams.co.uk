import { datumCreate } from '../datum';
import authentication from '../../utils/authentication';
import reqSecure from '../../utils/reqSecure';
import paymentsAllowedAttributes from './paymentsAllowedAttributes';

export default function create(req) {
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        resolve(
          datumCreate(
            { redisKey: 'payments', user: user },
            reqSecure(req, paymentsAllowedAttributes),
          ),
        );
      },
      err => reject(err),
    );
  });
}
