#!/usr/bin/env node

import { datumCreate } from '../datum';

import loadAll from './loadAll.js';

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
    pageId: 'page1',
    comment: 'Some comment 2',
    deleted: true,
  };
  const comment2 = {
    requestedId: 'comment2',
    pageId: 'page2',
    comment: 'Some comment 2',
    deleted: false,
  };
  const comment3 = {
    requestedId: 'comment3',
    pageId: 'page3',
    comment: 'Some comment 3',
    deleted: false,
  };
  const comment4 = {
    requestedId: 'comment4',
    pageId: 'page3',
    comment: 'Some comment 4',
    deleted: false,
  };
  const comment5 = {
    requestedId: 'comment5',
    pageId: 'page3',
    comment: 'Some comment 5',
    deleted: true,
  };

  return datumCreate({ redisKey: 'comments' }, { body: comment1 })
    .then(() => datumCreate({ redisKey: 'comments' }, { body: comment2 }))
    .then(() => datumCreate({ redisKey: 'comments' }, { body: comment3 }))
    .then(() => datumCreate({ redisKey: 'comments' }, { body: comment4 }))
    .then(() => datumCreate({ redisKey: 'comments' }, { body: comment5 }));
};

test('load comments as admin - returns all values', () => {
  const req = {
    cookies: { session: 'adminSessionKey1' },
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => loadAll(req, { pageId: null }))
    .then(result => {
      expect(result.comments).toBeTruthy();
      expect(result.comments.length).toBe(5);
      expect(result.comments[0].id).toBe('comment1');
      expect(result.comments[1].id).toBe('comment2');
      expect(result.comments[2].id).toBe('comment3');
      expect(result.comments[3].id).toBe('comment4');
      expect(result.comments[4].id).toBe('comment5');
      return true;
    });
});

test('load comments as non-admin - returns non-deleted values', () => {
  const req = {
    cookies: { session: 'nonAdminSessionKey1' },
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => loadAll(req))
    .then(result => {
      expect(result.comments).toBeTruthy();
      expect(result.comments.length).toBe(3);
      expect(result.comments[0].id).toBe('comment2');
      expect(result.comments[1].id).toBe('comment3');
      expect(result.comments[2].id).toBe('comment4');
      return true;
    });
});

test('load comments unauthenticated - returns non-deleted values', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => loadAll(req))
    .then(result => {
      expect(result.comments).toBeTruthy();
      expect(result.comments.length).toBe(3);
      expect(result.comments[0].id).toBe('comment2');
      expect(result.comments[1].id).toBe('comment3');
      expect(result.comments[2].id).toBe('comment4');
      return true;
    });
});

test('load filtered comments unauthenticated - loads matching, non-deleted values', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => loadAll(req, { pageId: 'page3' }))
    .then(result => {
      expect(result.comments).toBeTruthy();
      expect(result.comments.length).toBe(2);
      expect(result.comments[0].id).toBe('comment3');
      expect(result.comments[1].id).toBe('comment4');
      return true;
    });
});
