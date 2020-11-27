#!/usr/bin/env node

import loadAll from './loadAll.js';

import { dbCreate } from 'server-utils/common/database';
import { clearDatabaseCollection, createUsersWithSessions } from 'server-utils/common/testUtils';

beforeEach(() => {
  clearDatabaseCollection('users');
  clearDatabaseCollection('sessions');
  clearDatabaseCollection('support');
});

const createSomeValues = () => {
  const support1 = {
    requestedId: 'support1',
  };
  const support2 = {
    requestedId: 'support2',
  };
  const support3 = {
    requestedId: 'support3',
    deleted: true,
  };

  return dbCreate({ redisKey: 'support' }, { body: support1 })
    .then(() => dbCreate({ redisKey: 'support' }, { body: support2 }))
    .then(() => dbCreate({ redisKey: 'support' }, { body: support3 }));
};

test('load support unauthenticated - returns non-deleted values', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => loadAll(req))
    .then(result => {
      expect(result.supportMessages).toBeTruthy();
      expect(result.supportMessages.length).toBe(2);
      expect(result.supportMessages[0].id).toBe('support2');
      expect(result.supportMessages[1].id).toBe('support1');
      return true;
    });
});
