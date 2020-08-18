#!/usr/bin/env node

import { SESSION_COOKIE_KEY } from 'helpers/storageConstants';
import load from './load.js';

import { dbCreate } from 'utils/common/database';
import { clearDatabaseCollection } from 'utils/common/testUtils';

beforeEach(() => {
  clearDatabaseCollection('sessions');
  clearDatabaseCollection('users');
});

const createSomeValues = () => {
  const user1 = {
    requestedId: 'test1',
    name: 'Test One',
    uname: 'test1',
    email: 'test1@example.com',
    emailVerified: true,
    admin: false,
  };

  const user2 = {
    requestedId: 'test2',
    name: 'Test Two',
    uname: 'test2',
    email: 'test2@example.com',
    emailVerified: true,
    admin: true,
  };

  return dbCreate({ redisKey: 'users' }, { body: user1 })
    .then(createdUser =>
      dbCreate({ redisKey: 'sessions' }, { body: { userId: createdUser.id, sessionKey: 'sessionKey1' } })
    )
    .then(() => dbCreate({ redisKey: 'users' }, { body: user2 }))
    .then(createdUser =>
      dbCreate({ redisKey: 'sessions' }, { body: { userId: createdUser.id, sessionKey: 'sessionKey2' } })
    );
};

test('load auth with no session - returns null user', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {},
  };

  return createSomeValues()
    .then(() => load(req))
    .then(result => {
      expect(result.user).toBe(null);
      return true;
    });
});

test('load auth with session - returns authenticated user', () => {
  const req1 = {
    cookies: { [SESSION_COOKIE_KEY]: 'sessionKey1' },
    headers: {},
    body: {},
  };
  const req2 = {
    cookies: { [SESSION_COOKIE_KEY]: 'sessionKey2' },
    headers: {},
    body: {},
  };

  return createSomeValues()
    .then(() => load(req1))
    .then(result => {
      expect(result.user).toBeTruthy();
      expect(result.user.id).toBe('test1');
      return true;
    })
    .then(() => load(req2))
    .then(result => {
      expect(result.user).toBeTruthy();
      expect(result.user.id).toBe('test2');
      return true;
    });
});
