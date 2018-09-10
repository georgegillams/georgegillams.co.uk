import { datumLoad, datumUpdate } from "../actions/datum";
import { find } from "../utils/find";
import setContentLastUpdatedTimestamp from "../utils/setContentLastUpdatedTimestamp";

export default function logout(req) {
  return new Promise((resolve, reject) => {
    datumLoad({ redisKey: "sessions" }).then(sessionData => {
      const { existingValue: session } = find(
        sessionData,
        req.cookies.session,
        "sessionKey"
      );
      if (session) {
        session.userId = null;
        session.userAuthenticatedTimestamp = null;
        resolve(datumUpdate({ redisKey: "sessions" }, { body: session }));
        resolve({ success: "You are now logged out" });
        setContentLastUpdatedTimestamp();
      } else {
        reject({
          error:
            "Invalid session. Try clearing cookies for this site and then re-authenticate"
        });
      }
    });
  });
}
