import { UNAUTHORISED_WRITE } from 'server-utils/common/errorConstants';
import authentication from 'server-utils/common/authentication';
import reqSecure from 'server-utils/common/reqSecure';
import cleanUpDeletedItems from './private/cleanUpDeletedItems';

export default async function cleanUp(req) {
  reqSecure(req, []);
  let user = await authentication(req);
  if (!user || !user.admin) {
    throw UNAUTHORISED_WRITE;
  }
  return cleanUpDeletedItems();
}
