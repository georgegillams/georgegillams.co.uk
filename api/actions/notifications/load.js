import { datumLoad } from "../datum";
import authentication from "../../utils/authentication";

export default function load(req) {
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        resolve(
          datumLoad({
            redisKey: "notifications",
            includeDeleted: user && user.admin
          })
        );
      },
      err => reject(err)
    );
  });
}
