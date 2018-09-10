import { datumLoadSingle } from "../datum";
import authentication from "../../utils/authentication";
import { userOwnsResource } from "../../utils/userOwnsResource";
import { UNAUTHORISED_READ } from "../../../src/utils/constants";

export default function loadSingle(req) {
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        userOwnsResource("payments", req.query.id, user).then(
          userOwnsResourceResult => {
            // Users should be able to delete comments that they own
            if (user && (user.admin || userOwnsResourceResult)) {
              resolve(
                datumLoadSingle({
                  redisKey: "payments",
                  includeDeleted: user && user.admin,
                  filter: ar => ar.id === req.query.id
                })
              );
            } else {
              reject(UNAUTHORISED_READ);
            }
          }
        );
      },
      err => reject(err)
    );
  });
}
