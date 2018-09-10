import redis from "../../utils/redis";
import { RESOURCE_NOT_FOUND } from "../../../src/utils/constants";

export default function datumLoadSingle(settings) {
  // load(req) {
  return new Promise((resolve, reject) => {
    redis.lrange(settings.redisKey, 0, -1, (err, reply) => {
      for (let inc = 0; inc < reply.length; inc += 1) {
        const value = JSON.parse(reply[inc]);
        if (!settings.filter || settings.filter(value)) {
          if (settings.includeDeleted || !value.deleted) {
            resolve(value);
          }
        }
      }
      reject(RESOURCE_NOT_FOUND);
    });
  });
}
