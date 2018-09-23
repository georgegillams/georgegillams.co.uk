import { datumCreate } from '../datum';
import authentication from '../../utils/authentication';
import reqsecure from '../../utils/reqsecure';
import paymentsAllowedAttributes from './paymentsAllowedAttributes';

export default function create(req) {
  const reqSecured = reqSecure(req, paymentsAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        resolve(datumCreate({ redisKey: 'payments', user: user }, reqSecured));
      },
      err => reject(err),
    );
  });
}
