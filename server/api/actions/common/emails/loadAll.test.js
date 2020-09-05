#!/usr/bin/env node

import { SESSION_COOKIE_KEY } from 'helpers/storageConstants';
import loadAll from './loadAll.js';

import { dbCreate } from 'utils/common/database';
import { AuthError } from 'utils/common/errors';
import { clearDatabaseCollection, createUsersWithSessions } from 'utils/common/testUtils';

beforeEach(() => {
  clearDatabaseCollection('analytics');
});

const createSomeValues = () => {
  const email1 = {
    from: 'from@example.com',
    to: 'to@example.com',
    body: '<email>stuff</email>',
  };

  const email2 = {
    from: 'from2@example.com',
    to: 'to2@example.com',
    body: '<email>reminder</email>',
  };

  return dbCreate({ redisKey: 'emails' }, { body: email1 }).then(() =>
    dbCreate({ redisKey: 'emails' }, { body: email2 })
  );
};

test('load all emails admin - returns all values', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => loadAll(req))
    .then(results => {
      expect(results.emails.length).toBe(2);
      expect(results.emails[0].from).toBe('from@example.com');
      expect(results.emails[0].to).toBe('to@example.com');
      return true;
    });
});

test('load all emails non-admin - throws auth error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'nonAdminSessionKey1' },
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => loadAll(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBe(true);
    });
});

test('load all emails unauthenticated - throws auth error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {},
  };

  return createSomeValues()
    .then(() => loadAll(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBe(true);
    });
});
