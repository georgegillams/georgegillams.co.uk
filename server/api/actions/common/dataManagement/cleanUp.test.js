#!/usr/bin/env node

import { SESSION_COOKIE_KEY } from '@george-gillams/webapp/helpers/storageConstants';
import { AuthError } from 'server-utils/common/errors';
import { clearDatabaseCollection, createUsersWithSessions } from 'server-utils/common/testUtils';
import cleanUp from './cleanUp';
import { dbLoad } from 'server-utils/common/database';
import appConfig from 'helpers/appConfig';
import redis from 'server-utils/common/redis';

beforeEach(() => {
  clearDatabaseCollection('users');
  clearDatabaseCollection('sessions');
  clearDatabaseCollection('emails');
});

const createSomeValues = async () => {
  const oldDeletedEmail = {
    id: 'oldDeletedEmail',
    to: 'address@example.com',
    message: 'Hi',
    lastUpdatedTimestamp: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000).toISOString(),
    deleted: true,
  };
  const newDeletedEmail = {
    id: 'newDeletedEmail',
    to: 'address@example.com',
    message: 'Hi',
    lastUpdatedTimestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    deleted: true,
  };
  const oldEmail = {
    id: 'oldEmail',
    to: 'address@example.com',
    message: 'Hi',
    lastUpdatedTimestamp: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000).toISOString(),
  };
  const newEmail = {
    id: 'newEmail',
    to: 'address@example.com',
    message: 'Hi',
    lastUpdatedTimestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  };

  await redis.rpush(`${appConfig.projectName}_emails`, JSON.stringify(oldEmail));
  await redis.rpush(`${appConfig.projectName}_emails`, JSON.stringify(newEmail));
  await redis.rpush(`${appConfig.projectName}_emails`, JSON.stringify(oldDeletedEmail));
  await redis.rpush(`${appConfig.projectName}_emails`, JSON.stringify(newDeletedEmail));
};

test('clean up non-admin - throws auth error', async () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'nonAdminSessionKey1' },
    headers: {},
  };

  try {
    await createUsersWithSessions();
    await createSomeValues();
    await cleanUp(req);

    // The action should have already thrown an error
    throw new Error('Should have thrown an error already');
  } catch (err) {
    expect(err instanceof AuthError).toBeTruthy();
    expect(err.message).toBe('You are not authorised to write to this resource');
  }

  // ensure the attempted cleanUp has not changed data
  const dbResult = await dbLoad({
    redisKey: 'emails',
    includeDeleted: true,
  });
  expect(dbResult.length).toBe(4);
  expect(dbResult[0].id).toBe('oldEmail');
  expect(dbResult[0].deleted).toBeUndefined();
  expect(dbResult[1].id).toBe('newEmail');
  expect(dbResult[1].deleted).toBeUndefined();
  expect(dbResult[2].id).toBe('oldDeletedEmail');
  expect(dbResult[2].deleted).toBe(true);
  expect(dbResult[3].id).toBe('newDeletedEmail');
  expect(dbResult[3].deleted).toBe(true);
});

test('clean up admin - deletes only old deleted items', async () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
  };

  await createUsersWithSessions();
  await createSomeValues();
  await cleanUp(req);

  const dbResult = await dbLoad({
    redisKey: 'emails',
    includeDeleted: true,
  });

  expect(dbResult.length).toBe(3);
  expect(dbResult[0].id).toBe('oldEmail');
  expect(dbResult[0].deleted).toBeUndefined();
  expect(dbResult[1].id).toBe('newEmail');
  expect(dbResult[1].deleted).toBeUndefined();
  expect(dbResult[2].id).toBe('newDeletedEmail');
  expect(dbResult[2].deleted).toBe(true);
});
