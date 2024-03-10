#!/usr/bin/env node

import deleteBook from './delete.js';

import { SESSION_COOKIE_KEY } from '@george-gillams/webapp/helpers/storageConstants';
import { dbCreate, dbLoad } from 'server-utils/common/database';
import { AuthError, NotFoundError } from 'server-utils/common/errors';
import { clearDatabaseCollection, createUsersWithSessions } from 'server-utils/common/testUtils';

beforeEach(() => {
  clearDatabaseCollection('users');
  clearDatabaseCollection('sessions');
  clearDatabaseCollection('books');
});

const createSomeValues = () => {
  const book1 = {
    requestedId: 'book1',
  };
  const book2 = {
    requestedId: 'book2',
  };

  return dbCreate({ redisKey: 'books' }, { body: book1 }).then(() => dbCreate({ redisKey: 'books' }, { body: book2 }));
};

test('delete book as admin - removes data from collection', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: {
      id: 'book1',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => deleteBook(req))
    .then(result => {
      expect(result).toBeTruthy();
      return true;
    })
    .then(() => dbLoad({ redisKey: 'books' }))
    .then(books => {
      expect(books.length).toBe(1);
      expect(books[0].id).toBe('book2');
      return true;
    });
});

test('delete non-existent book as admin - throws not found error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: {
      id: 'bookNotExists',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => deleteBook(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof NotFoundError).toBeTruthy();
    });
});

test('delete book non-admin - throws auth error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'nonAdminSessionKey1' },
    headers: {},
    body: {
      id: 'book1',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => deleteBook(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    })
    .finally(() =>
      dbLoad({
        redisKey: 'books',
      }).then(dbResult => {
        expect(dbResult.length).toBe(2);
        expect(dbResult[0].id).toBe('book1');
        return true;
      })
    );
});

test('delete book unauthenticated - throws auth error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {
      id: 'book1',
    },
  };

  return createSomeValues()
    .then(() => deleteBook(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    })
    .finally(() =>
      dbLoad({
        redisKey: 'books',
      }).then(dbResult => {
        expect(dbResult.length).toBe(2);
        expect(dbResult[0].id).toBe('book1');
        return true;
      })
    );
});
