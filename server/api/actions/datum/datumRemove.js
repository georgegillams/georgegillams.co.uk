import loadAllValues from './private/loadAllValues';
import datumUpdate from './datumUpdate';

import { RESOURCE_NOT_FOUND } from 'utils/errorConstants';
import { find } from 'utils/find';

export default function datumRemove(settings, req) {
  return loadAllValues(settings.redisKey).then(data => {
    const { existingValue } = find(data, req.body.id);

    if (!existingValue) {
      throw RESOURCE_NOT_FOUND;
    }

    const value = JSON.parse(JSON.stringify(existingValue));
    value.deleted = true;

    return datumUpdate(settings, { body: value });
  });
}
