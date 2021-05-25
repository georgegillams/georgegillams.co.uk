#!/usr/bin/env node

import create from './create.js';

import { SESSION_COOKIE_KEY } from '@george-gillams/webapp/helpers/storageConstants';
import { dbLoad } from 'server-utils/common/database';
import { AuthError } from 'server-utils/common/errors';
import { clearDatabaseCollection, createUsersWithSessions } from 'server-utils/common/testUtils';

beforeEach(() => {
  clearDatabaseCollection('users');
  clearDatabaseCollection('sessions');
  clearDatabaseCollection('support');
});

test('create support as admin - adds data to collection', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: {
      requestedId: 'supportLink1',
      name: 'Support link 1',
      description: 'description 1',
      url: 'support1.example.com',
    },
  };

  return createUsersWithSessions()
    .then(() => create(req))
    .then(() => dbLoad({ redisKey: 'support' }))
    .then(results => {
      expect(results).toBeTruthy();
      expect(results.length).toBe(1);
      expect(results[0].name).toBe('Support link 1');
      expect(results[0].description).toBe('description 1');
      expect(results[0].url).toBe('support1.example.com');
      return true;
    });
});

test('create support non-admin - throws auth error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'nonAdminSessionKey1' },
    headers: {},
    body: {
      requestedId: 'supportLink1',
      name: 'Support link 1',
      description: 'description 1',
      url: 'support1.example.com',
    },
  };

  return createUsersWithSessions()
    .then(() => create(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    })
    .finally(() =>
      dbLoad({ redisKey: 'support' }).then(results => {
        expect(results).toBeTruthy();
        expect(results.length).toBe(0);
        return true;
      })
    );
});

test('create support unauthenticated - throws auth error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {
      requestedId: 'supportLink1',
      name: 'Support link 1',
      description: 'description 1',
      url: 'support1.example.com',
    },
  };

  return create(req)
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    })
    .finally(() =>
      dbLoad({ redisKey: 'support' }).then(results => {
        expect(results).toBeTruthy();
        expect(results.length).toBe(0);
        return true;
      })
    );
});
