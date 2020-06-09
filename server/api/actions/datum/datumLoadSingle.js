import datumLoad from './datumLoad';

import { RESOURCE_NOT_FOUND } from 'utils/errorConstants';

export default function datumLoadSingle(settings) {
  // loads values using settings
  // returns first result
  // if no result, throws error OR returns null
  return datumLoad(settings).then(values => {
    if (values.length > 0) {
      return values[0];
    }
    if (settings.resolveIfNotFound) {
      return null;
    }
    throw RESOURCE_NOT_FOUND;
  });
}
