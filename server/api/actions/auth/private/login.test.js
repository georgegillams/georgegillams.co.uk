#!/usr/bin/env node

import { datumLoad } from '../../datum';

import login from './login.js';

import { clearDatabaseCollection } from 'utils/testUtils';

beforeEach(() => {
  clearDatabaseCollection('sessions');
});

test('perform login', () => {
  const userProfile = {
    id: 'testUserId1',
    uname: 'testUser',
    name: 'Test User',
  };

  return login(userProfile)
    .then(result => {
      expect(result).toBeTruthy();
      return true;
    })
    .then(() => datumLoad({ redisKey: 'sessions', includeOwnerUname: true }))
    .then(results => {
      expect(results.length).toBe(1);
      expect(results[0].userId).toBe('testUserId1');
      expect(results[0].sessionKey).toBeTruthy();
      return true;
    })
    .catch(err => {
      throw err;
    });
});

test('sessionKeys are random', () => {
  const userProfile1 = {
    id: 'testUserId1',
    uname: 'testUser1',
    name: 'Test User 1',
  };

  const userProfile2 = {
    id: 'testUserId2',
    uname: 'testUser2',
    name: 'Test User 2',
  };

  return login(userProfile1)
    .then(result => {
      expect(result).toBeTruthy();
      return true;
    })
    .then(() => login(userProfile2))
    .then(result => {
      expect(result).toBeTruthy();
      return true;
    })
    .then(() => datumLoad({ redisKey: 'sessions', includeOwnerUname: true }))
    .then(results => {
      expect(results.length).toBe(2);
      expect(results[0].userId).toBe('testUserId1');
      expect(results[1].userId).toBe('testUserId2');
      expect(results[0].sessionKey === results[1].sessionKey).toBe(false);
      return true;
    })
    .catch(err => {
      throw err;
    });
});
