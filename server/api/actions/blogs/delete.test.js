#!/usr/bin/env node

import { datumCreate, datumLoad } from '../datum';

import deleteBlog from './delete.js';

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
  };
  const blog2 = {
    requestedId: 'blog2',
  };

  return datumCreate({ redisKey: 'blogs' }, { body: blog1 }).then(() =>
    datumCreate({ redisKey: 'blogs' }, { body: blog2 }),
  );
};

test('delete blog as admin - removes data from collection', () => {
  const req = {
    cookies: { session: 'adminSessionKey1' },
    headers: {},
    body: {
      id: 'blog1',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => deleteBlog(req))
    .then(result => {
      expect(result).toBeTruthy();
      return true;
    })
    .then(() => datumLoad({ redisKey: 'blogs' }))
    .then(blogs => {
      expect(blogs.length).toBe(1);
      expect(blogs[0].id).toBe('blog2');
      return true;
    });
});

test('delete non-existent blog as admin - throws not found error', () => {
  const req = {
    cookies: { session: 'adminSessionKey1' },
    headers: {},
    body: {
      id: 'blogNotExists',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => deleteBlog(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof NotFoundError).toBeTruthy();
    });
});

test('delete blog non-admin - throws auth error', () => {
  const req = {
    cookies: { session: 'nonAdminSessionKey1' },
    headers: {},
    body: {
      id: 'blog1',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => deleteBlog(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    })
    .finally(() =>
      datumLoad({
        redisKey: 'blogs',
      }).then(dbResult => {
        expect(dbResult.length).toBe(2);
        expect(dbResult[0].id).toBe('blog1');
        return true;
      }),
    );
});

test('delete blog unauthenticated - throws auth error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {
      id: 'blog1',
    },
  };

  return createSomeValues()
    .then(() => deleteBlog(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    })
    .finally(() =>
      datumLoad({
        redisKey: 'blogs',
      }).then(dbResult => {
        expect(dbResult.length).toBe(2);
        expect(dbResult[0].id).toBe('blog1');
        return true;
      }),
    );
});
