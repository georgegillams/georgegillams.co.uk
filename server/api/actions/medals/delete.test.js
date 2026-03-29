#!/usr/bin/env node

import deleteMedal from './delete.js';

import { SESSION_COOKIE_KEY } from '@george-gillams/webapp/helpers/storageConstants';
import { dbCreate, dbLoad } from 'server-utils/common/database';
import { AuthError, NotFoundError } from 'server-utils/common/errors';
import { clearDatabaseCollection, createUsersWithSessions } from 'server-utils/common/testUtils';

beforeEach(() => {
  clearDatabaseCollection('users');
  clearDatabaseCollection('sessions');
  clearDatabaseCollection('medals');
});

const createSomeValues = () => {
  const medal1 = {
    requestedId: 'medal1',
    section: 'hyrox',
    title: 'Hyrox — London',
    year: '2023',
  };
  const medal2 = {
    requestedId: 'medal2',
    section: 'spartan',
    spartanType: 'sprint',
    year: '2024',
  };

  return dbCreate({ redisKey: 'medals' }, { body: medal1 }).then(() => dbCreate({ redisKey: 'medals' }, { body: medal2 }));
};

test('delete medal as admin - removes data from collection', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: {
      id: 'medal1',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => deleteMedal(req))
    .then(result => {
      expect(result).toBeTruthy();
      return true;
    })
    .then(() => dbLoad({ redisKey: 'medals' }))
    .then(medals => {
      expect(medals.length).toBe(1);
      expect(medals[0].id).toBe('medal2');
      return true;
    });
});

test('delete non-existent medal as admin - throws not found error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: {
      id: 'medalNotExists',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => deleteMedal(req))
    .then(() => {
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof NotFoundError).toBeTruthy();
    });
});

test('delete medal non-admin - throws auth error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'nonAdminSessionKey1' },
    headers: {},
    body: {
      id: 'medal1',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => deleteMedal(req))
    .then(() => {
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    })
    .finally(() =>
      dbLoad({
        redisKey: 'medals',
      }).then(dbResult => {
        expect(dbResult.length).toBe(2);
        expect(dbResult[0].id).toBe('medal1');
        return true;
      })
    );
});

test('delete medal unauthenticated - throws auth error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {
      id: 'medal1',
    },
  };

  return createSomeValues()
    .then(() => deleteMedal(req))
    .then(() => {
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    })
    .finally(() =>
      dbLoad({
        redisKey: 'medals',
      }).then(dbResult => {
        expect(dbResult.length).toBe(2);
        expect(dbResult[0].id).toBe('medal1');
        return true;
      })
    );
});

