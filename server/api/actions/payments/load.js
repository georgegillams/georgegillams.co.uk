import { datumLoad } from '../datum';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';
import { UNAUTHORISED_READ } from 'helpers/constants';
import paymentsAllowedAttributes from './paymentsAllowedAttributes';

export default function loadAll(req) {
  const reqSecured = reqSecure(req, paymentsAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        if (user && user.admin) {
          resolve(
            datumLoad({
              redisKey: 'payments',
              includeDeleted: true,
            }),
          );
        } else {
          resolve(UNAUTHORISED_READ);
        }
      },
      err => reject(err),
    );
  });
}
