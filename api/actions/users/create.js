import { datumCreate, datumLoad } from "../datum";
import authentication from "../../utils/authentication";
import { hash } from "../../utils/hash";
import { find, emailFingerprint } from "../../utils/find";
import { sendEmailVerificationEmail } from "../../utils/emailHelpers";
import { UNAUTHORISED_WRITE } from "../../../src/utils/constants";

export default function create(req) {
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        datumLoad({ redisKey: "users" }).then(userData => {
          // Only admins can create admins!
          if ((user && user.admin) || !req.body.admin) {
            // If a user already has the username, we cannot allow a new one to be created
            const { existingValue: userWithSameUname } = find(
              userData,
              req.body.uname,
              "uname"
            );
            const { existingValue: userWithSameEmail } = find(
              userData,
              emailFingerprint(req.body.email),
              "emailFingerprint"
            );
            if (userWithSameUname || userWithSameEmail) {
              reject({
                error: "A user with that username or email already exists",
                reason: "A user with that username already exists"
              });
            } else {
              if (req.body.password) {
                req.body.hash = hash(req.body.password);
                req.body.password = null;
              }
              req.body.emailFingerprint = emailFingerprint(req.body.email);
              req.body.emailVerified = true; // TODO CHANGE TO false;
              datumCreate({ redisKey: "users", user: user }, req).then(
                newUser => {
                  // TODO sendEmailVerificationEmail(newUser);
                  resolve(newUser);
                }
              );
            }
          } else {
            reject(UNAUTHORISED_WRITE);
          }
        });
      },
      err => reject(err)
    );
  });
}
