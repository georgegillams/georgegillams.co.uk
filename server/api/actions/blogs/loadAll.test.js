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
    publishedTimestamp: 3,
  };
  const blog2 = {
    requestedId: 'blog2',
    published: false,
    publishedTimestamp: 2,
  };
  const blog3 = {
    requestedId: 'blog3',
    published: true,
    deleted: true,
    publishedTimestamp: 1,
  };

  return datumCreate({ redisKey: 'blogs' }, { body: blog1 })
    .then(() => datumCreate({ redisKey: 'blogs' }, { body: blog2 }))
    .then(() => datumCreate({ redisKey: 'blogs' }, { body: blog3 }));
};

test('load blogs as admin - returns all values', () => {
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
      expect(result.blogs.length).toBe(3);
      expect(result.blogs[0].id).toBe('blog1');
      expect(result.blogs[1].id).toBe('blog2');
      expect(result.blogs[2].id).toBe('blog3');
      return true;
    });
});

test('load blogs as non-admin - returns published, non-deleted values', () => {
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

test('load blogs unauthenticated - returns published, non-deleted values', () => {
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
