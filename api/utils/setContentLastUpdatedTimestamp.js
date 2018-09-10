import { datumLoad, datumCreate, datumUpdate } from "../actions/datum";

export default function setContentLastUpdatedTimestamp() {
  let newContentUpdateData = {};
  datumLoad({ redisKey: "contentUpdates" }).then(contentUpdateData => {
    if (contentUpdateData && contentUpdateData.length > 0) {
      newContentUpdateData = contentUpdateData[0];
      newContentUpdateData.timestamp = Date.now().toString();
      datumUpdate(
        { redisKey: "contentUpdates" },
        { body: newContentUpdateData }
      );
    } else {
      datumCreate(
        { redisKey: "contentUpdates" },
        { body: { timestamp: Date.now() } }
      );
    }
  });
}
