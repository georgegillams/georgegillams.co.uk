#!/usr/bin/env node

import { datumLoad } from '../datum';

import create from './create.js';

import {
  clearDatabaseCollection,
  createUsersWithSessions,
} from 'utils/testUtils';

beforeEach(() => {
  clearDatabaseCollection('users');
  clearDatabaseCollection('sessions');
  clearDatabaseCollection('comments');
});

test('create comment authenticated', () => {
  const req = {
    cookies: { session: 'nonAdminSessionKey1' },
    headers: {},
    body: {
      pageId: 'page1',
      displayName: 'displayName1',
      comment: 'comment1',
    },
  };

  return createUsersWithSessions()
    .then(() => create(req))
    .then(() => datumLoad({ redisKey: 'comments' }))
    .then(comments => {
      expect(comments.length).toBe(1);
      expect(comments[0].displayName).toBe('nonAdminUser1');
      expect(comments[0].comment).toBe('comment1');
      expect(comments[0].pageId).toBe('page1');
      return true;
    });
});

test('create comment unauthenticated', () => {
  const req = {
    cookies: { session: 'noSuchSession' },
    headers: {},
    body: {
      pageId: 'page1',
      displayName: 'displayName1',
      comment: 'comment1',
    },
  };

  return createUsersWithSessions()
    .then(() => create(req))
    .then(() => datumLoad({ redisKey: 'comments' }))
    .then(comments => {
      expect(comments.length).toBe(1);
      expect(comments[0].displayName).toBe('displayName1');
      expect(comments[0].comment).toBe('comment1');
      expect(comments[0].pageId).toBe('page1');
      return true;
    });
});
