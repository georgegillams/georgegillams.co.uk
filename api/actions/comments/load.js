import { datumLoad } from "../datum";
import authentication from "../../utils/authentication";

export default function load(req) {
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        resolve(
          datumLoad({
            redisKey: "comments",
            includeOwnerUname: true,
            includeDeleted: user && user.admin,
            filter: req.query.pageId
              ? comment => comment.pageId === req.query.pageId
              : null
          })
        );
      },
      err => reject(err)
    );
  });
}
