import { datumLoadSingle } from "../datum";
import authentication from "../../utils/authentication";

export default function loadSingle(req) {
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        if (user && user.admin) {
          resolve(
            datumLoadSingle({
              redisKey: "blogs",
              includeDeleted: true,
              filter: ar => ar.id === req.query.id
            })
          );
        } else {
          resolve(
            datumLoadSingle({
              redisKey: "blogs",
              filter: ar => ar.published && ar.id === req.query.id
            })
          );
        }
      },
      err => reject(err)
    );
  });
}
