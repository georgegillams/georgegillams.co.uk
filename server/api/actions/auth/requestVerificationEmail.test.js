#!/usr/bin/env node

import requestVerificationEmail from './requestVerificationEmail.js';

import { clearDatabaseCollection } from 'utils/testUtils';
import { AuthError } from 'helpers/Errors';
import { UNAUTHORISED_WRITE } from 'helpers/constants';

beforeEach(() => {
  clearDatabaseCollection('sessions');
  clearDatabaseCollection('users');
});

test('request verification email unauthenticated', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {},
  };

  return requestVerificationEmail(req)
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBe(true);
      expect(err).toBe(UNAUTHORISED_WRITE);
    });
});

test('request verification email authenticated', () => {
  const req = {
    cookies: {},
    headers: { apikey: 'asdfghjkl' },
    body: {},
  };

  return requestVerificationEmail(req).then(result => {
    expect(result.success).toBeTruthy();
    expect(result.success).toBe('Verification email resent');
    return true;
  });
});
