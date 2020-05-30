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
    name: 'Admin User One',
    uname: 'adminUser1',
    email: 'adminUser1@example.com',
    emailVerified: true,
    admin: true,
  };

  const user2 = {
    requestedId: 'nonAdminUser1',
    name: 'Non Admin User One',
    uname: 'nonAdminUser1',
    email: 'nonAdminUser1@example.com',
    emailVerified: true,
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
