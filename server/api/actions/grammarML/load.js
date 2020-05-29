import { datumLoad } from '../datum';

import grammarMLAllowedAttributes from './grammarMLAllowedAttributes';

import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';

export default function load(req) {
  reqSecure(req, grammarMLAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(req).then(
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
