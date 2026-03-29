#!/usr/bin/env node

import create from './create.js';

import { SESSION_COOKIE_KEY } from '@george-gillams/webapp/helpers/storageConstants';
import { AuthError } from 'server-utils/common/errors';
import { clearDatabaseCollection, createUsersWithSessions } from 'server-utils/common/testUtils';

beforeEach(() => {
  clearDatabaseCollection('users');
  clearDatabaseCollection('sessions');
  clearDatabaseCollection('medals');
});

test('create medal as admin - adds data to collection', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: {
      section: 'hyrox',
      title: 'Hyrox — Katowice Doubles',
      year: '2024',
      eventDate: '2024-03-01',
    },
  };

  return createUsersWithSessions()
    .then(() => create(req))
    .then(result => {
      expect(result).toBeTruthy();
      expect(result.section).toBe('hyrox');
      expect(result.title).toBe('Hyrox — Katowice Doubles');
      return true;
    });
});

test('create medal non-admin - throws auth error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'nonAdminSessionKey1' },
    headers: {},
    body: {
      section: 'hyrox',
      title: 'Hyrox — Katowice Doubles',
    },
  };

  return createUsersWithSessions()
    .then(() => create(req))
    .then(() => {
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    });
});

test('create medal unauthenticated - throws auth error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {
      section: 'hyrox',
      title: 'Hyrox — Katowice Doubles',
    },
  };

  return create(req)
    .then(() => {
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    });
});

