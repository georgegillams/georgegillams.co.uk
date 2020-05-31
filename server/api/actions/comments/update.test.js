#!/usr/bin/env node

import { datumCreate, datumLoad } from '../datum';

import update from './update.js';

import { AuthError, NotFoundError } from 'helpers/Errors';
import {
  clearDatabaseCollection,
  createUsersWithSessions,
} from 'utils/testUtils';

beforeEach(() => {
  clearDatabaseCollection('users');
  clearDatabaseCollection('sessions');
  clearDatabaseCollection('comments');
});

const createSomeValues = () => {
  const comment1 = {
    requestedId: 'comment1',
    comment: 'Some comment 1',
  };
  const comment2 = {
    requestedId: 'comment2',
    comment: 'Some comment 2',
  };
  const comment3 = {
    requestedId: 'comment3',
    comment: 'Some comment 3',
  };

  return datumCreate({ redisKey: 'comments' }, { body: comment1 })
    .then(() => datumCreate({ redisKey: 'comments' }, { body: comment2 }))
    .then(() =>
      datumCreate(
        { redisKey: 'comments', user: { id: 'nonAdminUser1' } },
        { body: comment3 },
      ),
    );
};

test('update comment as admin - updates data', () => {
  const req = {
    cookies: { session: 'adminSessionKey1' },
    headers: {},
    body: {
      id: 'comment1',
      comment: 'Edited 1',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => update(req))
    .then(result => {
      expect(result).toBeTruthy();
      return true;
    })
    .then(() => datumLoad({ redisKey: 'comments' }))
    .then(comments => {
      expect(comments.length).toBe(3);
      expect(comments[0].id).toBe('comment1');
      expect(comments[0].comment).toBe('Edited 1');
      expect(comments[1].id).toBe('comment2');
      expect(comments[1].comment).toBe('Some comment 2');
      return true;
    });
});

test('update non-existent comment as admin - throws not found error', () => {
  const req = {
    cookies: { session: 'adminSessionKey1' },
    headers: {},
    body: {
      id: 'commentNotExists',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => update(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof NotFoundError).toBeTruthy();
    });
});

test('update own comment non-admin - updates data', () => {
  const req = {
    cookies: { session: 'nonAdminSessionKey1' },
    headers: {},
    body: {
      id: 'comment3',
      comment: 'Edited 3',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => update(req))
    .then(() => datumLoad({ redisKey: 'comments' }))
    .then(comments => {
      expect(comments.length).toBe(3);
      expect(comments[0].id).toBe('comment1');
      expect(comments[0].comment).toBe('Some comment 1');
      expect(comments[1].id).toBe('comment2');
      expect(comments[1].comment).toBe('Some comment 2');
      expect(comments[2].id).toBe('comment3');
      expect(comments[2].comment).toBe('Edited 3');
      return true;
    });
});

test('update other comment non-admin - throws auth error', () => {
  const req = {
    cookies: { session: 'nonAdminSessionKey2' },
    headers: {},
    body: {
      id: 'comment2',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => update(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    });
});

test('update comment unauthenticated - throws auth error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {
      id: 'comment1',
    },
  };

  return createSomeValues()
    .then(() => update(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    });
});
