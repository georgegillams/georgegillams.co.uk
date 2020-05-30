#!/usr/bin/env node

import { datumCreate } from '../datum';

import loadAll from './loadAll.js';

import {
  clearDatabaseCollection,
  createUsersWithSessions,
} from 'utils/testUtils';

beforeEach(() => {
  clearDatabaseCollection('users');
  clearDatabaseCollection('sessions');
  clearDatabaseCollection('blogs');
});

const createSomeValues = () => {
  const blog1 = {
    requestedId: 'blog1',
    published: true,
  };
  const blog2 = {
    requestedId: 'blog2',
    published: false,
  };

  return datumCreate({ redisKey: 'blogs' }, { body: blog1 }).then(() =>
    datumCreate({ redisKey: 'blogs' }, { body: blog2 }),
  );
};

test('load blogs as admin', () => {
  const req = {
    cookies: { session: 'adminSessionKey1' },
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => loadAll(req))
    .then(result => {
      expect(result.blogs).toBeTruthy();
      expect(result.blogs.length).toBe(2);
      expect(result.blogs[0].id).toBe('blog2');
      expect(result.blogs[1].id).toBe('blog1');
      return true;
    });
});

test('load blogs as non-admin', () => {
  const req = {
    cookies: { session: 'nonAdminSessionKey1' },
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => loadAll(req))
    .then(result => {
      expect(result.blogs).toBeTruthy();
      expect(result.blogs.length).toBe(1);
      expect(result.blogs[0].id).toBe('blog1');
      return true;
    });
});

test('load blogs unauthenticated', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => loadAll(req))
    .then(result => {
      expect(result.blogs).toBeTruthy();
      expect(result.blogs.length).toBe(1);
      expect(result.blogs[0].id).toBe('blog1');
      return true;
    });
});
