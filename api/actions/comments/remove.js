import { datumRemove } from "../datum";
import authentication from "../../utils/authentication";
import { userOwnsResource } from "../../utils/userOwnsResource";
import { UNAUTHORISED_WRITE } from "../../../src/utils/constants";

export default function remove(req) {
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        userOwnsResource("comments", req.body.id, user).then(
          userOwnsResourceResult => {
            // Users should be able to delete comments that they own
            if (user && (user.admin || userOwnsResourceResult)) {
              resolve(datumRemove({ redisKey: "comments" }, req));
            } else {
              reject(UNAUTHORISED_WRITE);
            }
          }
        );
      },
      err => reject(err)
    );
  });
}