#!/usr/bin/env node

import deleteSupport from './delete.js';

import { SESSION_COOKIE_KEY } from '@george-gillams/webapp/helpers/storageConstants';
import { dbCreate, dbLoad } from 'server-utils/common/database';
import { AuthError, NotFoundError } from 'server-utils/common/errors';
import { clearDatabaseCollection, createUsersWithSessions } from 'server-utils/common/testUtils';

beforeEach(() => {
  clearDatabaseCollection('users');
  clearDatabaseCollection('sessions');
  clearDatabaseCollection('support');
});

const createSomeValues = () => {
  const support1 = {
    requestedId: 'support1',
  };
  const support2 = {
    requestedId: 'support2',
  };

  return dbCreate({ redisKey: 'support' }, { body: support1 }).then(() =>
    dbCreate({ redisKey: 'support' }, { body: support2 })
  );
};

test('delete support as admin - removes data from collection', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: {
      id: 'support1',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => deleteSupport(req))
    .then(result => {
      expect(result).toBeTruthy();
      return true;
    })
    .then(() => dbLoad({ redisKey: 'support' }))
    .then(results => {
      expect(results.length).toBe(1);
      expect(results[0].id).toBe('support2');
      return true;
    });
});

test('delete non-existent support as admin - throws not found error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: {
      id: 'supportNotExists',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => deleteSupport(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof NotFoundError).toBeTruthy();
    });
});

test('delete support non-admin - throws auth error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'nonAdminSessionKey1' },
    headers: {},
    body: {
      id: 'support1',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => deleteSupport(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    })
    .finally(() =>
      dbLoad({
        redisKey: 'support',
      }).then(dbResult => {
        expect(dbResult.length).toBe(2);
        expect(dbResult[0].id).toBe('support1');
        return true;
      })
    );
});

test('delete support unauthenticated - throws auth error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {
      id: 'support1',
    },
  };

  return createSomeValues()
    .then(() => deleteSupport(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    })
    .finally(() =>
      dbLoad({
        redisKey: 'support',
      }).then(dbResult => {
        expect(dbResult.length).toBe(2);
        expect(dbResult[0].id).toBe('support1');
        return true;
      })
    );
});
