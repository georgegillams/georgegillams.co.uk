import { datumCreate } from '../datum';
import authentication from '../../utils/authentication';

export default function create(req) {
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        resolve(datumCreate({ redisKey: 'profiles', user: user }, req));
      },
      err => reject(err),
    );
  });
}
