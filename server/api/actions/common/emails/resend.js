import { dbLoad } from 'utils/common/database';
import authentication from 'utils/common/authentication';
import { UNAUTHORISED_READ } from 'utils/common/errorConstants';
import { RESOURCE_NOT_FOUND } from '../../../../utils/common/errorConstants';
import { sendEmail } from 'utils/emails';
import { find } from 'utils/common/find';

export default function resend(req) {
  return authentication(req)
    .then(user => {
      if (user && user.admin) {
        return dbLoad({
          redisKey: 'emails',
        });
      }
      throw UNAUTHORISED_READ;
    })
    .then(emailData => {
      const { existingValue: matchingEmail } = find(emailData, req.body.id);
      if (!matchingEmail) {
        throw RESOURCE_NOT_FOUND;
      }
      return sendEmail(matchingEmail);
    });
}
