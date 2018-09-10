import { datumLoad } from "../datum";
import { find } from "../../utils/find";

export default function unametaken(req) {
  return new Promise(resolve => {
    setTimeout(() => {
      datumLoad({ redisKey: "users" }).then(userData => {
        const { existingValue: userWithUname } = find(
          userData,
          req.body.uname,
          "uname"
        );
        if (userWithUname) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    }, 750);
  });
}
