import { datumCreate } from "../datum";
import crypto from "crypto";
import authentication from "../../utils/authentication";

export default function create(req) {
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        req.body.sessionKey = crypto.randomBytes(20).toString("hex");
        req.body.lastActive = Date.now();
        resolve(datumCreate({ redisKey: "sessions", user: user }, req));
      },
      err => reject(err)
    );
  });
}
