#!/usr/bin/env node

import { datumCreate, datumLoad } from '../datum';

import deleteComment from './delete.js';

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
  };
  const comment2 = {
    requestedId: 'comment2',
  };
  const comment3 = {
    requestedId: 'comment3',
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

test('delete comment as admin - removes data', () => {
  const req = {
    cookies: { session: 'adminSessionKey1' },
    headers: {},
    body: {
      id: 'comment1',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => deleteComment(req))
    .then(result => {
      expect(result).toBeTruthy();
      return true;
    })
    .then(() => datumLoad({ redisKey: 'comments' }))
    .then(comments => {
      expect(comments.length).toBe(2);
      expect(comments[0].id).toBe('comment2');
      expect(comments[1].id).toBe('comment3');
      return true;
    });
});

test('delete non-existent comment as admin - throws not found error', () => {
  const req = {
    cookies: { session: 'adminSessionKey1' },
    headers: {},
    body: {
      id: 'commentNotExists',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => deleteComment(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof NotFoundError).toBeTruthy();
    });
});

test('delete own comment non-admin - removes data', () => {
  const req = {
    cookies: { session: 'nonAdminSessionKey1' },
    headers: {},
    body: {
      id: 'comment3',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => deleteComment(req))
    .then(() => datumLoad({ redisKey: 'comments' }))
    .then(comments => {
      expect(comments.length).toBe(2);
      expect(comments[0].id).toBe('comment1');
      expect(comments[1].id).toBe('comment2');
      return true;
    });
});

test('delete other comment non-admin - throws auth error', () => {
  const req = {
    cookies: { session: 'nonAdminSessionKey2' },
    headers: {},
    body: {
      id: 'comment2',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => deleteComment(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    })
    .finally(() =>
      datumLoad({
        redisKey: 'comments',
      }).then(dbResult => {
        expect(dbResult.length).toBe(3);
        expect(dbResult[1].id).toBe('comment2');
        return true;
      }),
    );
});

test('delete comment unauthenticated - throws auth error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {
      id: 'comment1',
    },
  };

  return createSomeValues()
    .then(() => deleteComment(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    })
    .finally(() =>
      datumLoad({
        redisKey: 'comments',
      }).then(dbResult => {
        expect(dbResult.length).toBe(3);
        expect(dbResult[0].id).toBe('comment1');
        return true;
      }),
    );
});
