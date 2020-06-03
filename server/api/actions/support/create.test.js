#!/usr/bin/env node

import { datumLoad } from '../datum';

import create from './create.js';

import { AuthError } from 'helpers/Errors';
import {
  clearDatabaseCollection,
  createUsersWithSessions,
} from 'utils/testUtils';

beforeEach(() => {
  clearDatabaseCollection('users');
  clearDatabaseCollection('sessions');
  clearDatabaseCollection('support');
});

test('create support as admin - adds data to collection', () => {
  const req = {
    cookies: { session: 'adminSessionKey1' },
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
    .then(() => datumLoad({ redisKey: 'support' }))
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
    cookies: { session: 'nonAdminSessionKey1' },
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
      datumLoad({ redisKey: 'support' }).then(results => {
        expect(results).toBeTruthy();
        expect(results.length).toBe(0);
        return true;
      }),
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
      datumLoad({ redisKey: 'support' }).then(results => {
        expect(results).toBeTruthy();
        expect(results.length).toBe(0);
        return true;
      }),
    );
});
