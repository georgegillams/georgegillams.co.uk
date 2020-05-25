import { RESOURCE_NOT_FOUND } from 'helpers/constants';
import { find } from 'utils/find';

import datumLoad from './datumLoad';
import datumUpdate from './datumUpdate';

export default function datumRemove(settings, req) {
  return new Promise((resolve, reject) => {
    datumLoad(settings, req).then(
      data => {
        const { existingValue, existingValueIndex } = find(data, req.body.id);

        if (existingValue) {
          const value = JSON.parse(JSON.stringify(existingValue));
          value.deleted = true;

          resolve(datumUpdate(settings, { body: value }));
        } else {
          reject(RESOURCE_NOT_FOUND);
        }
      },
      err => {
        reject(err);
      },
    );
  });
}
