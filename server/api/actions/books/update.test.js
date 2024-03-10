#!/usr/bin/env node

import updateBook from './update.js';

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
    content: 'Book 1 content',
  };
  const book2 = {
    requestedId: 'book2',
    content: 'Book 2 content',
  };

  return dbCreate({ redisKey: 'books' }, { body: book1 }).then(() => dbCreate({ redisKey: 'books' }, { body: book2 }));
};

test('update book as admin - updates data', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: {
      id: 'book1',
      content: 'Edited content',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => updateBook(req))
    .then(result => {
      expect(result).toBeTruthy();
      return true;
    })
    .then(() => dbLoad({ redisKey: 'books' }))
    .then(books => {
      expect(books.length).toBe(2);
      expect(books[0].id).toBe('book1');
      expect(books[0].content).toBe('Edited content');
      expect(books[1].id).toBe('book2');
      expect(books[1].content).toBe('Book 2 content');
      return true;
    });
});

test('update non-existent book as admin - throws not found error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: {
      id: 'bookNotExists',
      content: 'Edited content',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => updateBook(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof NotFoundError).toBeTruthy();
    });
});

test('update book non-admin - throws auth error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'nonAdminSessionKey1' },
    headers: {},
    body: {
      id: 'book1',
      content: 'Edited content',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => updateBook(req))
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
        expect(dbResult[0].id).toBe('book1');
        expect(dbResult[0].content).toBe('Book 1 content');
        return true;
      })
    );
});

test('update book unauthenticated - throws auth error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {
      id: 'book1',
      content: 'Edited content',
    },
  };

  return createSomeValues()
    .then(() => updateBook(req))
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
        expect(dbResult[0].id).toBe('book1');
        expect(dbResult[0].content).toBe('Book 1 content');
        return true;
      })
    );
});
