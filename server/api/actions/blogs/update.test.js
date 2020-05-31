#!/usr/bin/env node

import { datumCreate, datumLoad } from '../datum';

import updateBlog from './update.js';

import { AuthError, NotFoundError } from 'helpers/Errors';
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
    content: 'Blog 1 content',
  };
  const blog2 = {
    requestedId: 'blog2',
    content: 'Blog 2 content',
  };

  return datumCreate({ redisKey: 'blogs' }, { body: blog1 }).then(() =>
    datumCreate({ redisKey: 'blogs' }, { body: blog2 }),
  );
};

test('update blog as admin - updates data', () => {
  const req = {
    cookies: { session: 'adminSessionKey1' },
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
    .then(() => datumLoad({ redisKey: 'blogs' }))
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
    cookies: { session: 'adminSessionKey1' },
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
    cookies: { session: 'nonAdminSessionKey1' },
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
    });
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
    });
});
