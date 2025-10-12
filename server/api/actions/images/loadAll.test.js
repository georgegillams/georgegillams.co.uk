#!/usr/bin/env node

import loadAll from './loadAll.js';

import { SESSION_COOKIE_KEY } from '@george-gillams/webapp/helpers/storageConstants';
import { clearDatabaseCollection, createUsersWithSessions } from 'server-utils/common/testUtils';

beforeEach(() => {
  clearDatabaseCollection('users');
  clearDatabaseCollection('sessions');
  clearDatabaseCollection('images');
});

test('loadAll images as admin - returns images array', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
  };

  return createUsersWithSessions()
    .then(() => loadAll(req))
    .then(result => {
      expect(result).toBeTruthy();
      expect(result.images).toBeDefined();
      expect(Array.isArray(result.images)).toBeTruthy();
      return true;
    });
});

test('loadAll images non-admin - throws auth error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'nonAdminSessionKey1' },
    headers: {},
  };

  return createUsersWithSessions()
    .then(() => loadAll(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err.message).toContain('Unauthorized access');
    });
});

test('loadAll images unauthenticated - throws auth error', () => {
  const req = {
    cookies: {},
    headers: {},
  };

  return loadAll(req)
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err.message).toContain('Unauthorized access');
    });
});
