#!/usr/bin/env node

import create from './create.js';

import { AuthError } from 'utils/errors';
import {
  clearDatabaseCollection,
  createUsersWithSessions,
} from 'utils/testUtils';

beforeEach(() => {
  clearDatabaseCollection('users');
  clearDatabaseCollection('sessions');
  clearDatabaseCollection('blogs');
});

test('create blog as admin - adds data to collection', () => {
  const req = {
    cookies: { session: 'adminSessionKey1' },
    headers: {},
    body: {
      name: 'testBlog',
      content: 'Blah blah',
    },
  };

  return createUsersWithSessions()
    .then(() => create(req))
    .then(result => {
      expect(result).toBeTruthy();
      expect(result.name).toBe('testBlog');
      expect(result.content).toBe('Blah blah');
      return true;
    });
});

test('create blog non-admin - throws auth error', () => {
  const req = {
    cookies: { session: 'nonAdminSessionKey1' },
    headers: {},
    body: {
      name: 'testBlog',
      content: 'Blah blah',
    },
  };

  return createUsersWithSessions()
    .then(() => create(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    });
});

test('create blog unauthenticated - throws auth error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {
      name: 'testBlog',
      content: 'Blah blah',
    },
  };

  return create(req)
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    });
});