#!/usr/bin/env node

import { datumCreate } from '../datum';

import load from './load.js';

import { clearDatabaseCollection } from 'utils/testUtils';

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

  return datumCreate({ redisKey: 'users' }, { body: user1 })
    .then(createdUser =>
      datumCreate(
        { redisKey: 'sessions' },
        { body: { userId: createdUser.id, sessionKey: 'sessionKey1' } },
      ),
    )
    .then(() => datumCreate({ redisKey: 'users' }, { body: user2 }))
    .then(createdUser =>
      datumCreate(
        { redisKey: 'sessions' },
        { body: { userId: createdUser.id, sessionKey: 'sessionKey2' } },
      ),
    );
};

test('load auth with no session', () => {
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
    })
    .catch(err => {
      throw err;
    });
});

test('load auth with session', () => {
  const req1 = {
    cookies: { session: 'sessionKey1' },
    headers: {},
    body: {},
  };
  const req2 = {
    cookies: { session: 'sessionKey2' },
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
    })
    .catch(err => {
      throw err;
    });
});
