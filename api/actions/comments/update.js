import { datumUpdate } from "../datum";
import authentication from "../../utils/authentication";
import { userOwnsResource } from "../../utils/userOwnsResource";
import { UNAUTHORISED_WRITE } from "../../../src/utils/constants";

export default function update(req) {
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        userOwnsResource("comments", req.body.id, user).then(
          userOwnsResourceResult => {
            // Users should be able to update comments that they own
            if (user && (user.admin || userOwnsResourceResult)) {
              resolve(datumUpdate({ redisKey: "comments" }, req));
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
