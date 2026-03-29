#!/usr/bin/env node

import loadAll from './loadAll.js';

import { SESSION_COOKIE_KEY } from '@george-gillams/webapp/helpers/storageConstants';
import { dbCreate } from 'server-utils/common/database';
import { clearDatabaseCollection, createUsersWithSessions } from 'server-utils/common/testUtils';

beforeEach(() => {
  clearDatabaseCollection('users');
  clearDatabaseCollection('sessions');
  clearDatabaseCollection('medals');
});

const createSomeValues = () => {
  const medal1 = {
    requestedId: 'medal1',
    section: 'spartan',
    year: '2024',
    eventDate: '2024-06-01',
    spartanType: 'sprint',
  };
  const medal2 = {
    requestedId: 'medal2',
    section: 'spartan',
    year: '2024',
    eventDate: '2024-01-01',
    spartanType: 'beast',
    deleted: true,
  };
  const medal3 = {
    requestedId: 'medal3',
    section: 'hyrox',
    year: '2023',
    title: 'Hyrox — London',
    eventDate: '2023-02-01',
  };

  return dbCreate({ redisKey: 'medals' }, { body: medal1 })
    .then(() => dbCreate({ redisKey: 'medals' }, { body: medal2 }))
    .then(() => dbCreate({ redisKey: 'medals' }, { body: medal3 }));
};

test('load medals as admin - returns all values including deleted', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => loadAll(req))
    .then(result => {
      expect(result.medals).toBeTruthy();
      expect(result.medals.length).toBe(3);
      expect(result.medals[0].id).toBe('medal1');
      expect(result.medals[1].id).toBe('medal2');
      expect(result.medals[2].id).toBe('medal3');
      return true;
    });
});

test('load medals unauthenticated - returns non-deleted values', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => loadAll(req))
    .then(result => {
      expect(result.medals).toBeTruthy();
      expect(result.medals.length).toBe(2);
      expect(result.medals[0].id).toBe('medal1');
      expect(result.medals[1].id).toBe('medal3');
      return true;
    });
});

