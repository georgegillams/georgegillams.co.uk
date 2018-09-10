import { datumLoadSingle } from "../datum";
import authentication from "../../utils/authentication";

export default function loadSingle(req) {
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        if (user && user.admin) {
          resolve(
            datumLoadSingle({
              redisKey: "comments",
              includeDeleted: true,
              filter: ar => ar.id === req.query.id
            })
          );
        } else {
          resolve(
            datumLoadSingle({
              redisKey: "comments",
              filter: ar => ar.id === req.query.id
            })
          );
        }
      },
      err => reject(err)
    );
  });
}
