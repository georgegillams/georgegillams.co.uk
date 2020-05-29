#!/usr/bin/env node

// TODO Test no such emailCode (code4)
// TODO Code expired (try code 1 twice)
// TODO valid code, no such user (code3)
// TODO valid code, valid user (code 2)

import { datumCreate, datumLoad } from '../datum';

import verifyEmail from './verifyEmail.js';

import { clearDatabaseCollection } from 'utils/testUtils';
import { AuthError } from 'helpers/Errors';

beforeEach(() => {
  clearDatabaseCollection('emailVerificationCodes');
  clearDatabaseCollection('users');
});

const createSomeValues = () => {
  const user1 = {
    requestedId: 'test1',
    name: 'Test One',
    uname: 'test1',
    email: 'test1@example.com',
    emailVerified: true,
    admin: false,
  };

  const user2 = {
    requestedId: 'test2',
    name: 'Test Two',
    uname: 'test2',
    email: 'test2@example.com',
    emailVerified: true,
    admin: true,
  };

  const emailVerificationCode1 = {
    key: 'emailVerificationKey1',
    userId: 'test1',
    expiry: Number.MAX_SAFE_INTEGER,
  };

  const emailVerificationCode2 = {
    key: 'emailVerificationKey2',
    userId: 'test2',
    expiry: Number.MAX_SAFE_INTEGER,
  };

  const emailVerificationCode3 = {
    key: 'emailVerificationKey3',
    userId: 'test3',
    expiry: Number.MAX_SAFE_INTEGER,
  };

  return datumCreate({ redisKey: 'users' }, { body: user1 })
    .then(() => datumCreate({ redisKey: 'users' }, { body: user2 }))
    .then(() =>
      datumCreate(
        { redisKey: 'emailVerificationCodes' },
        { body: emailVerificationCode1 },
      ),
    )
    .then(() =>
      datumCreate(
        { redisKey: 'emailVerificationCodes' },
        { body: emailVerificationCode2 },
      ),
    )
    .then(() =>
      datumCreate(
        { redisKey: 'emailVerificationCodes' },
        { body: emailVerificationCode3 },
      ),
    );
};

test('verify email with non-existent code', () => {
  const req = {
    cookies: {},
    headers: {},
    body: { verificationKey: 'emailVerificationKeyDoesNotExist' },
  };

  return createSomeValues()
    .then(() => verifyEmail(req))
    .catch(err => {
      expect(err instanceof AuthError).toBe(true);
      expect(err.message).toBe('Invalid verification link');
    });
});

test('verification sets code expiry to 0', () => {
  const req = {
    cookies: {},
    headers: {},
    body: { verificationKey: 'emailVerificationKey2' },
  };

  return createSomeValues()
    .then(() => verifyEmail(req))
    .then(() => datumLoad({ redisKey: 'emailVerificationCodes' }))
    .then(codes => {
      expect(codes.length).toBe(3);
      expect(codes[1].expiry).toBe(0);
      return true;
    })
    .then(() => datumLoad({ redisKey: 'users' }))
    .then(users => {
      expect(users.length).toBe(2);
      expect(users[1].emailVerified).toBe(true);
      return true;
    });
});

test('verify email with expired code', () => {
  const req = {
    cookies: {},
    headers: {},
    body: { verificationKey: 'emailVerificationKey1' },
  };

  return createSomeValues()
    .then(() => verifyEmail(req))
    .then(() => verifyEmail(req))
    .catch(err => {
      expect(err instanceof AuthError).toBe(true);
      expect(err.message).toBe('Email verification link has expired');
    });
});

test('verify email with code not matching user', () => {
  const req = {
    cookies: {},
    headers: {},
    body: { verificationKey: 'emailVerificationKey3' },
  };

  return createSomeValues()
    .then(() => verifyEmail(req))
    .catch(err => {
      expect(err instanceof AuthError).toBe(true);
      expect(err.message).toBe('Invalid user');
    });
});
