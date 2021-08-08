#!/usr/bin/env node

import loadSingle from './loadSingle.js';

import { SESSION_COOKIE_KEY } from '@george-gillams/webapp/helpers/storageConstants';
import { dbCreate } from 'server-utils/common/database';
import { NotFoundError } from 'server-utils/common/errors';
import { clearDatabaseCollection, createUsersWithSessions } from 'server-utils/common/testUtils';

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

  return dbCreate({ redisKey: 'blogs' }, { body: blog1 }).then(() => dbCreate({ redisKey: 'blogs' }, { body: blog2 }));
};

test('load unpublished blog as admin - returns value', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => loadSingle(req, { id: 'blog2' }))
    .then(blog => {
      expect(blog).toBeTruthy();
      expect(blog.id).toBe('blog2');
      return true;
    });
});

test('load unpublished blog non-admin - throws not found error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'nonAdminSessionKey1' },
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => loadSingle(req, { id: 'blog2' }))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof NotFoundError).toBeTruthy();
    });
});

test('load unpublished blog unauthenticated - throws not found error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => loadSingle(req, { id: 'blog2' }))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof NotFoundError).toBeTruthy();
    });
});

test('load published blog as admin - returns value', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => loadSingle(req, { id: 'blog1' }))
    .then(blog => {
      expect(blog).toBeTruthy();
      expect(blog.id).toBe('blog1');
      return true;
    });
});

test('load published blog non-admin - returns value', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'nonAdminSessionKey1' },
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => loadSingle(req, { id: 'blog1' }))
    .then(blog => {
      expect(blog).toBeTruthy();
      expect(blog.id).toBe('blog1');
      return true;
    });
});

test('load published blog unauthenticated - returns value', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => loadSingle(req, { id: 'blog1' }))
    .then(blog => {
      expect(blog).toBeTruthy();
      expect(blog.id).toBe('blog1');
      return true;
    });
});
