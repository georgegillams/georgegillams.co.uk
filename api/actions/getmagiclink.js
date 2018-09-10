import { datumLoad } from "../actions/datum";
import { find } from "../utils/find";
import { sendMagicLinkEmail } from "../utils/emailHelpers";

export default function getmagiclink(req) {
  return new Promise(resolve => {
    datumLoad({ redisKey: "users" }).then(userData => {
      const { existingValue: userProfile } = find(
        userData,
        req.body.email.toLowerCase(),
        "email"
      );
      if (userProfile) {
        sendMagicLinkEmail(userProfile);
      }
      resolve({
        success:
          "A magic link has been generated and sent to the email associated with your account"
      });
    });
  });
}
