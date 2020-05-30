#!/usr/bin/env node

import { datumCreate, datumLoad } from '../datum';

import verifyEmail from './verifyEmail.js';

import {
  clearDatabaseCollection,
  createUsersWithSessions,
} from 'utils/testUtils';
import { AuthError } from 'helpers/Errors';

beforeEach(() => {
  clearDatabaseCollection('emailVerificationCodes');
  clearDatabaseCollection('users');
});

const createSomeValues = () => {
  const emailVerificationCode1 = {
    key: 'emailVerificationKey1',
    userId: 'adminUser1',
    expiry: new Date(Date.now() + 60 * 60),
  };

  const emailVerificationCode2 = {
    key: 'emailVerificationKey2',
    userId: 'nonAdminUser1',
    expiry: new Date(Date.now() + 60 * 60),
  };

  const emailVerificationCode3 = {
    key: 'emailVerificationKey3',
    userId: 'test3',
    expiry: new Date(Date.now() + 60 * 60),
  };

  return datumCreate(
    { redisKey: 'emailVerificationCodes' },
    { body: emailVerificationCode1 },
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

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => verifyEmail(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
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

  return createUsersWithSessions()
    .then(() => createSomeValues())
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

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => verifyEmail(req))
    .then(() => verifyEmail(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
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

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => verifyEmail(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBe(true);
      expect(err.message).toBe('Invalid user');
    });
});
