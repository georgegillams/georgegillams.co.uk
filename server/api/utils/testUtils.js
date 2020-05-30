#!/usr/bin/env node

import { datumCreate } from '../actions/datum';

import { PROJECT_NAME } from 'helpers/constants';
import redis from 'utils/redis';

const clearDatabaseCollection = collectionName => {
  redis.del(`${PROJECT_NAME}_${collectionName}`);
};

const createUsersWithSessions = () => {
  const user1 = {
    requestedId: 'adminUser1',
    uname: 'adminUser1',
    admin: true,
  };

  const user2 = {
    requestedId: 'nonAdminUser1',
    uname: 'nonAdminUser1',
    admin: false,
  };

  const session1 = {
    sessionKey: 'adminSessionKey1',
    userId: 'adminUser1',
  };

  const session2 = {
    sessionKey: 'nonAdminSessionKey1',
    userId: 'nonAdminUser1',
  };

  return datumCreate({ redisKey: 'users' }, { body: user1 })
    .then(() => datumCreate({ redisKey: 'users' }, { body: user2 }))
    .then(() => datumCreate({ redisKey: 'sessions' }, { body: session1 }))
    .then(() => datumCreate({ redisKey: 'sessions' }, { body: session2 }));
};

export { clearDatabaseCollection, createUsersWithSessions };
export default { clearDatabaseCollection, createUsersWithSessions };
