import performRestoration from './private/performRestoration';

import authentication from 'utils/authentication';
import { PROJECT_NAME } from 'helpers/constants';
import { UNAUTHORISED_WRITE } from 'utils/errorConstants';

export default function create(req) {
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        if (user && user.admin) {
          if (req.files && req.files.backupFile) {
            const dataBuffer = req.files.backupFile.data;
            const restorationObject = JSON.parse(dataBuffer.toString());
            if (restorationObject.projectName !== PROJECT_NAME) {
              reject({
                error: 'wrong-input',
                errorMessage: 'The backup was taken from a different project.',
              });
            } else {
              performRestoration(restorationObject.data);
              resolve(true);
            }
            return;
          }
          reject({
            error: 'wrong-input',
            errorMessage:
              'A backup file must be provided to carry out the restoration.',
          });
        } else {
          reject(UNAUTHORISED_WRITE);
        }
      },
      err => reject(err),
    );
  });
}
