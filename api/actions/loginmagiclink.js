import { datumLoad, datumUpdate } from "../actions/datum";
import { find } from "../utils/find";

export default function loginmagiclink(req) {
  return new Promise((resolve, reject) => {
    const { magicLinkKey } = req.body;
    datumLoad({ redisKey: "magiclinks" }).then(magicLinkData => {
      const { existingValue: magicLink } = find(
        magicLinkData,
        magicLinkKey,
        "key"
      );
      if (magicLink) {
        if (Date.now() < new Date(magicLink.expiry).getTime()) {
          // invalidate magic link (set expiry to 0)
          magicLink.expiry = 0;
          datumUpdate({ redisKey: "magiclinks" }, { body: magicLink });
          datumLoad({ redisKey: "sessions" }).then(sessionData => {
            const { existingValue: session } = find(
              sessionData,
              req.cookies.session,
              "sessionKey"
            );
            if (session) {
              session.userId = magicLink.userId;
              session.userAuthenticatedTimestamp = Date.now();
              resolve(datumUpdate({ redisKey: "sessions" }, { body: session }));
            } else {
              reject({ error: "Invalid session" });
            }
          });
        } else {
          reject({ error: "Magic link has expired" });
        }
      } else {
        reject({ error: "Invalid magic link" });
      }
    });
  });
}
