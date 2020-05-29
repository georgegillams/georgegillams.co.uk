import { datumRemove } from '../datum';

import grammarMLAllowedAttributes from './grammarMLAllowedAttributes';

import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from 'helpers/constants';
import reqSecure from 'utils/reqSecure';

export default function remove(req) {
  reqSecure(req, grammarMLAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        resolve(datumRemove({ redisKey: 'grammarML' }, req));
      },
      err => reject(err),
    );
  });
}
