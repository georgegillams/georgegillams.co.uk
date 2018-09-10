import { datumLoad } from "../datum";
import { find, emailFingerprint } from "../../utils/find";

export default function emailtaken(req) {
  return new Promise(resolve => {
    setTimeout(() => {
      datumLoad({ redisKey: "users" }).then(userData => {
        const { existingValue: userWithEmail } = find(
          userData,
          emailFingerprint(req.body.email),
          "emailFingerPrint"
        );
        if (userWithEmail) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    }, 750);
  });
}
