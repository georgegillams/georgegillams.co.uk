import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';

import { datumLoad } from '../datum';

import grammarMLAllowedAttributes from './grammarMLAllowedAttributes';

export default function load(req) {
  const reqSecured = reqSecure(req, grammarMLAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        resolve(
          datumLoad({
            redisKey: 'grammarML',
          }),
        );
      },
      err => reject(err),
    );
  });
}
