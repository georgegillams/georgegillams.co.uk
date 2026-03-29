#!/usr/bin/env node

import updateMedal from './update.js';

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

test('update medal as admin - updates data', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: {
      id: 'medal1',
      section: 'hyrox',
      title: 'Hyrox — Stockholm',
      year: '2023',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => updateMedal(req))
    .then(result => {
      expect(result).toBeTruthy();
      return true;
    })
    .then(() => dbLoad({ redisKey: 'medals' }))
    .then(medals => {
      expect(medals.length).toBe(2);
      expect(medals[0].id).toBe('medal1');
      expect(medals[0].title).toBe('Hyrox — Stockholm');
      return true;
    });
});

test('update non-existent medal as admin - throws not found error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: {
      id: 'medalNotExists',
      section: 'hyrox',
      title: 'Hyrox — Stockholm',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => updateMedal(req))
    .then(() => {
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof NotFoundError).toBeTruthy();
    });
});

test('update medal non-admin - throws auth error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'nonAdminSessionKey1' },
    headers: {},
    body: {
      id: 'medal1',
      section: 'hyrox',
      title: 'Hyrox — Stockholm',
      year: '2023',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => updateMedal(req))
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
        expect(dbResult[0].id).toBe('medal1');
        expect(dbResult[0].title).toBe('Hyrox — London');
        return true;
      })
    );
});

test('update medal unauthenticated - throws auth error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {
      id: 'medal1',
      section: 'hyrox',
      title: 'Hyrox — Stockholm',
      year: '2023',
    },
  };

  return createSomeValues()
    .then(() => updateMedal(req))
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
        expect(dbResult[0].id).toBe('medal1');
        expect(dbResult[0].title).toBe('Hyrox — London');
        return true;
      })
    );
});

