#!/usr/bin/env node

import { datumLoad } from '../datum';

import setKey from './setKey.js';

import { AuthError } from 'utils/errors';
import {
  clearDatabaseCollection,
  createUsersWithSessions,
} from 'utils/testUtils';

beforeEach(() => {
  clearDatabaseCollection('users');
  clearDatabaseCollection('sessions');
  clearDatabaseCollection('monzoapikeys');
});

test('create monzo API key as admin - adds data to collection', () => {
  const req = {
    cookies: { session: 'adminSessionKey1' },
    headers: {},
    body: {
      key: 'monzoApiKey1',
    },
  };

  return createUsersWithSessions()
    .then(() => setKey(req))
    .then(() => datumLoad({ redisKey: 'monzoapikeys' }))
    .then(apiKeys => {
      expect(apiKeys.length).toBe(1);
      expect(apiKeys[0].key).toBe('monzoApiKey1');
      return true;
    });
});

test('create monzo API key non-admin - throws auth error', () => {
  const req = {
    cookies: { session: 'nonAdminSessionKey1' },
    headers: {},
    body: {
      key: 'monzoApiKey1',
    },
  };

  return createUsersWithSessions()
    .then(() => setKey(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    });
});

test('create monzo API key unauthenticated - throws auth error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {
      key: 'monzoApiKey1',
    },
  };

  return setKey(req)
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    });
});
