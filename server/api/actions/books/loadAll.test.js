#!/usr/bin/env node

import loadAll from './loadAll.js';

import { SESSION_COOKIE_KEY } from '@george-gillams/webapp/helpers/storageConstants';
import { dbCreate } from 'server-utils/common/database';
import { clearDatabaseCollection, createUsersWithSessions } from 'server-utils/common/testUtils';

beforeEach(() => {
  clearDatabaseCollection('users');
  clearDatabaseCollection('sessions');
  clearDatabaseCollection('books');
});

const createSomeValues = () => {
  const book1 = {
    requestedId: 'book1',
    content: 'book 1 content',
  };
  const book2 = {
    requestedId: 'book2',
    deleted: true,
    content: 'book 2 content',
  };

  return dbCreate({ redisKey: 'books' }, { body: book1 }).then(() => dbCreate({ redisKey: 'books' }, { body: book2 }));
};

test('load books as admin - returns all values', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => loadAll(req))
    .then(result => {
      expect(result.books).toBeTruthy();
      expect(result.books.length).toBe(2);
      expect(result.books[0].id).toBe('book1');
      expect(result.books[1].id).toBe('book2');
      expect(result.books[0].content).toBe('book 1 content');
      expect(result.books[1].content).toBe('book 2 content');
      return true;
    });
});

test('load books unauthenticated - returns non-deleted values', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => loadAll(req))
    .then(result => {
      expect(result.books).toBeTruthy();
      expect(result.books.length).toBe(1);
      expect(result.books[0].id).toBe('book1');
      return true;
    });
});
