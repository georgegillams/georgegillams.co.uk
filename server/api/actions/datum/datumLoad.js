import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';

import loadAllValues from './private/loadAllValues';

import { find } from 'utils/find';

const attachUNames = results =>
  loadAllValues('users').then(userData => {
    const attachedResults = results.map(value => {
      let ownerUname = 'Anon';
      if (value.authorId) {
        const { existingValue: owner } = find(userData, value.authorId);

        if (owner && owner.uname) {
          ownerUname = owner.uname;
        }
      }
      return { ...value, ownerUname };
    });
    return attachedResults;
  });

export default function datumLoad(settings) {
  // load all values
  // remove deleted
  // filter
  // sort
  // attach ownerUname
  return loadAllValues(settings.redisKey)
    .then(data => {
      let result = [];
      for (let ind = 0; ind < data.length; ind += 1) {
        const value = data[ind];

        if (settings.removeFields) {
          settings.removeFields.forEach(rf => {
            delete value[rf];
          });
        }

        if (!settings.filter || settings.filter(value)) {
          if (!value.deleted || settings.includeDeleted) {
            result.push(value);
          }
        }
      }

      if (settings.sortKey) {
        result = reverse(sortBy(result, [settings.sortKey]));
      }

      return result;
    })
    .then(result => {
      if (!settings.includeOwnerUname || settings.redisKey === 'users') {
        return result;
      }
      return attachUNames(result);
    });
}
/*
  return new Promise(resolve => {
    if (settings.includeOwnerUname && settings.redisKey !== 'users') {
      datumLoad({ redisKey: 'users' }).then(userData => {
        redis.lrange(
          `${PROJECT_NAME}_${settings.redisKey}`,
          0,
          -1,
          (err, reply) => {
            let result = [];
            for (let inc = 0; inc < reply.length; inc += 1) {
              const value = JSON.parse(reply[inc]);

              if (value.authorId) {
                const { existingValue: commentOwner } = find(
                  userData,
                  value.authorId,
                );

                let ownerUname = 'Anon';
                if (commentOwner && commentOwner.uname) {
                  ownerUname = commentOwner.uname;
                }

                value.ownerUname = ownerUname;
                if (settings.removeFields) {
                  settings.removeFields.forEach(rf => {
                    value[rf] = null;
                  });
                }
              }
              if (!settings.filter || settings.filter(value)) {
                if (!value.deleted || settings.includeDeleted) {
                  result.push(value);
                }
              }
            }

            if (settings.sortKey) {
              result = reverse(sortBy(result, [settings.sortKey]));
            }

            resolve(result);
          },
        );
      });
    } else {
      redis.lrange(
        `${PROJECT_NAME}_${settings.redisKey}`,
        0,
        -1,
        (err, reply) => {
          let result = [];
          for (let inc = 0; inc < reply.length; inc += 1) {
            const value = JSON.parse(reply[inc]);
            if (!settings.filter || settings.filter(value)) {
              if (!value.deleted || settings.includeDeleted) {
                result.push(value);
              }
            }
            if (settings.removeFields) {
              settings.removeFields.forEach(rf => {
                value[rf] = null;
              });
            }
          }

          if (settings.sortKey) {
            result = reverse(sortBy(result, [settings.sortKey]));
          }

          resolve(result);
        },
      );
    }
  });
}
*/
