#!/usr/bin/env node

import updateBlog from './update.js';

import { SESSION_COOKIE_KEY } from '@george-gillams/webapp/helpers/storageConstants';
import { dbCreate, dbLoad } from 'server-utils/common/database';
import { AuthError, NotFoundError } from 'server-utils/common/errors';
import { clearDatabaseCollection, createUsersWithSessions } from 'server-utils/common/testUtils';

beforeEach(() => {
  clearDatabaseCollection('users');
  clearDatabaseCollection('sessions');
  clearDatabaseCollection('blogs');
});

const createSomeValues = () => {
  const blog1 = {
    requestedId: 'blog1',
    content: 'Blog 1 content',
  };
  const blog2 = {
    requestedId: 'blog2',
    content: 'Blog 2 content',
  };

  return dbCreate({ redisKey: 'blogs' }, { body: blog1 }).then(() => dbCreate({ redisKey: 'blogs' }, { body: blog2 }));
};

test('update blog as admin - updates data', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: {
      id: 'blog1',
      content: 'Edited content',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => updateBlog(req))
    .then(result => {
      expect(result).toBeTruthy();
      return true;
    })
    .then(() => dbLoad({ redisKey: 'blogs' }))
    .then(blogs => {
      expect(blogs.length).toBe(2);
      expect(blogs[0].id).toBe('blog1');
      expect(blogs[0].content).toBe('Edited content');
      expect(blogs[1].id).toBe('blog2');
      expect(blogs[1].content).toBe('Blog 2 content');
      return true;
    });
});

test('update non-existent blog as admin - throws not found error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: {
      id: 'blogNotExists',
      content: 'Edited content',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => updateBlog(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof NotFoundError).toBeTruthy();
    });
});

test('update blog non-admin - throws auth error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'nonAdminSessionKey1' },
    headers: {},
    body: {
      id: 'blog1',
      content: 'Edited content',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => updateBlog(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    })
    .finally(() =>
      dbLoad({
        redisKey: 'blogs',
      }).then(dbResult => {
        expect(dbResult[0].id).toBe('blog1');
        expect(dbResult[0].content).toBe('Blog 1 content');
        return true;
      })
    );
});

test('update blog unauthenticated - throws auth error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {
      id: 'blog1',
      content: 'Edited content',
    },
  };

  return createSomeValues()
    .then(() => updateBlog(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    })
    .finally(() =>
      dbLoad({
        redisKey: 'blogs',
      }).then(dbResult => {
        expect(dbResult[0].id).toBe('blog1');
        expect(dbResult[0].content).toBe('Blog 1 content');
        return true;
      })
    );
});
