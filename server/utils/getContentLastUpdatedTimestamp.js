import { datumLoad } from '../api/actions/datum';

export default function getContentLastUpdatedTimestamp() {
  datumLoad({ redisKey: 'contentUpdates' }).then(contentUpdateData => {
    if (contentUpdateData && contentUpdateData.length > 0) {
      // In the interest of reducing traffic, only send the raw timestamp value
      return contentUpdateData[0].lastUpdatedTimestamp;
    }
    return 1;
  });
}
