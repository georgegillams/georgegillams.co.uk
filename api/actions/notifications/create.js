import { datumCreate } from "../datum";
import authentication from "../../utils/authentication";
import { UNAUTHORISED_WRITE } from "../../../src/utils/constants";

export default function create(req) {
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        if (user && user.admin) {
          resolve(datumCreate({ redisKey: "notifications", user: user }, req));
        } else {
          reject(UNAUTHORISED_WRITE);
        }
      },
      err => reject(err)
    );
  });
}
