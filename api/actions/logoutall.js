import { datumLoad, datumUpdate } from "../actions/datum";
import authentication from "../utils/authentication";
import setContentLastUpdatedTimestamp from "../utils/setContentLastUpdatedTimestamp";

export default function logoutall(req) {
  return new Promise(resolve => {
    authentication(req).then(user => {
      if (user) {
        datumLoad({ redisKey: "sessions" }).then(sessionData => {
          for (let it = 0; it < sessionData.length; it += 1) {
            const session = sessionData[it];
            if (session.userId === user.id) {
              session.userId = null;
              session.userAuthenticatedTimestamp = null;
              resolve(datumUpdate({ redisKey: "sessions" }, { body: session }));
              setContentLastUpdatedTimestamp();
            }
          }
        });
      }
    });
  });
}
